const http = require('http'); // http untuk membuat server
const fs = require('fs').promises; // untuk operasi file asyng/await
const path = require('path'); // untuk kontruksi path yang aman
const { formatBytes } = require('./monitor.js')
const os = require('os')

//buat http server dasar
const server = http.createServer(async (req, res) => {
    //logic akan ditambahkan disini
});
//mendaftar handle ke request secara otomatis, gunakan ini kalau hanya 1 handler

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
})

//bangun fungsi logging
async function logRequest(req) {
    const timestamp = new Date().toISOString(); //waktu ISO Standar
    const logData = `[${timestamp}] ${req.method} ${req.url} FROM ${req.socket.remoteAddress}\n`

    const logPath = path.join(__dirname, 'request.log'); //gunakan path.join untuk kompatibilitas cross-platform

    try {
        await fs.appendFile(logPath, logData); //appendFile dengan flag "a" untuk menambahkan log tanpa overwrite
    } catch (error) {
        console.error('Logging error:', error);
    }
}

//implementasi di request handler
server.on('request', async (req, res) => {
    //jalankan logging tanpa menunggu
    logRequest(req) //tidak perlu await untuk logRequest agar response tetap cepat
    //error handling sudah ada didalam fungsi logRequest

    //handle response
    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Home Page')
    } else if (req.url === "/health") {
        //menambahkan endpoint monitoring di server
        //handle response health
        const memory = {
            total: formatBytes(os.totalmem()),
            used: formatBytes(os.totalmem() - os.freemem()),
            free: formatBytes(os.freemem())
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(memory))
    } else {
        res.writeHead(404);
        res.end('Page Not Found');
    }

})
//manual menambahkan handler, gunakan ini kalau ingin modular/multi-handler

/*
fs.appendFile(path, data, options)
await fs.appendFile('log.txt', 'Log ini', { encoding: 'utf8', mode: 0o666, flag: 'a' })

-encoding: default-nya 'utf8'
-mode: izin file, default 0o666
-flag: default 'a' untuk append (jangan ubah ini kalau tujuannya menambahkan)
*/