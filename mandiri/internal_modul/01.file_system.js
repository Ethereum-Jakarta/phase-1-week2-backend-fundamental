const fs = require('fs');
const path = require('path');

//sync: hanya untuk inisialisasi awal
// membaca file
try {
    const config = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8');
    // const config = fs.readFileSync(path.join(__dirname, "..", "asynchronous", 'promise.js'), 'utf8');
    console.log('Konfigurasi server:', JSON.parse(config));
} catch (error) {
    console.error('Gagal baca config:', error)
}

/*
fs.readFileSync(), digunakan untuk membaca file secara sinkron (blocking)
path.join(__dirname, 'package.json') membentuk path absolut ke file package.json di folder yang sama dengan file JS ini.

'utf8' menunjukkan bahwa file dibaca sebagai teks (string), bukan Buffer.
JSON.parse(config) mengubah string JSON menjadi objek JavaScript.
*/

// async: untuk operasi runtime
// menulis file
fs.promises.writeFile('server.log', `${new Date()} - Server started\n`, { flag: 'a' })
    .then(() => {
        console.log('Log berhasil ditambahkan');
    })
    .catch(error => console.error('Error logging', error))

/*
fs.writeFile()
-membuat file baru jika file belum ada
-menimpa (overwrite) isi file jika file sudah ada

flag: 'a' (append)
-jika file belum ada dibuat
-jika file sudah ada, baris di tambahkan ke akhir

Daftar flag umum di writeFile:
Flag	Fungsi
'w' Tulis dan timpa (default)
'a' Tulis dan tambahkan ke akhir
'wx' Tulis hanya jika file belum ada (error kalau file sudah ada)
*/

/*
readFileSync() + JSON.parse(), bertujuan Membaca dan memuat konfigurasi aplikasi dari file .json saat startup
writeFile() dengan flag 'a', bertujuan Menyimpan log aktivitas aplikasi ke dalam file .log tanpa menghapus log sebelumnya

analogi:
readFileSync = "Buka buku panduan sebelum mulai kerja"
writeFile (log) = "Tulis catatan kejadian saat kerja berlangsung"
*/