const http = require('http');
const fs = require('fs').promises;
const path = require('path');

async function logRequest(req) {
        const timestamp = new Date().toISOString();
        const logData = `[${timestamp}] ${req.method} ${req.url} FROM ${req.socket.remoteAddress}\n`;
        
        const logPath = path.join(__dirname, 'requests.log');
        
        try {
            await fs.appendFile(logPath, logData);
        } catch (error) {
            console.error('Logging error:', error);
        }
}

const server = http.createServer(async (req, res) => {
    
    logRequest(req);

    // Handle response
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Home Page');
    } else {
        res.writeHead(404);
        res.end('Page Not Found');
    }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});