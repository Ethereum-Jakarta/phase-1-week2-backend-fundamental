const http = require('http');

const server = http.createServer((req, res) => {
    //routing sederhana
    if (req.url === '/api/users' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify([{ id: 1, name: "John" }]))
    } else {
        res.writeHead(400);
        res.end("Route not found");
    }
})

server.listen(3000, () => {
    console.log('API server running on port 3000');
})

/*
res.writeHead(...) = Menentukan status code dan header dari response.
{ 'Content-Type': 'application/json' } = Header ini memberi tahu client (misalnya browser atau Postman) bahwa response berisi JSON, bukan HTML atau teks biasa.

res.end(...) = Mengakhiri response dan mengirim data ke client.

JSON.stringify(...) = Mengubah array/objek JavaScript menjadi string JSON valid, karena res.end() hanya menerima string atau buffer.

req(incoming message)
Berisi semua informasi tentang permintaan yang dikirim client, seperti:
req.url, URL yang diminta (misal: /api/users)
req.method, HTTP method (GET, POST, dsb)
req.headers, Semua header dari client
req.body, Data yang dikirim (perlu di-parse manual di Node.js mentah)

res (server response)
Digunakan untuk mengirim balasan (response) ke client.
res.writeHead(statusCode, headers), Menulis status dan header
res.write(data), Menulis sebagian data
res.end(data), Menutup koneksi dan kirim data
res.setHeader(), Menetapkan header manual
*/