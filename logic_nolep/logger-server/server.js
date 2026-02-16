// membuat http server dengan dan http logging

const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');

// membuat http server dasar
const server = http.createServer(async (req, res) => {
    // logic akan ditambah di sini
});

server.listen(3000, () => {
    console.log('server running on http://localhost:3000');
});

// membangun fungsi logging
async function logRequest(req) {
    const timestamp = new Date().toISOString();
    const logData = `[${timestamp}] ${req.method} ${req.url} FROM ${req.socket.remoteAddress}\n`;

    const logPath = path.join(__dirname, 'request.log'); // it's like C:\Users\icank\projects\logger-server\request.log


    try {
        await fs.appendFile(logPath, logData);
    } catch (error) {
        console.error('logging error', error);
    }
}
/*  best practice: 
    - gunakan path.join utk kompabilitas cross-platform
    - flag 'a' pada appendFile utk menambah log tanpa overwrite
*/

// implementasi di request handler
const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

server.on('request', async (req, res) => {
    // jalankan logging tanpa menunggu
    logRequest(req);

    // handle response
    if (req.url === '/'){
        res.writeHead(200, {'content-type': 'text-plain'});
        res.end('Home Page');
    } 
    else if (req.url === '/health'){
        const memory = {
            total: formatBytes(os.totalmem()),
            used: formatBytes(os.totalmem() - os.freemem()),
            free: formatBytes(os.freemem()) 
        }
        
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify(memory));
    } else {
        res.writeHead(404);
        res.end('Page Not Found');
    }
});



