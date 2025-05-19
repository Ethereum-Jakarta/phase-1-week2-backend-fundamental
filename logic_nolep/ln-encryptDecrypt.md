# Logic Nolep (encryptTugas)

Bungkus isi dari tugas ini jadi folder encryptTugas yang didalamnya ada package.json. Jangan lupa ignore node modulesnya di dalam folder ini.

*encryptTugas: Membuat Aplikasi Pengenkripsi dan Penjadwalan Tugas*

**Langkah-Langkah:**

Instalasi Library:
Pertama, buatlah direktori baru untuk proyek Kalian dan navigasikan ke dalamnya di terminal.
Jalankan perintah npm init -y untuk membuat file package.json dengan pengaturan default.
Instal library crypto-js dan moment dengan menjalankan perintah berikut:
npm install crypto-js moment

jangan lupa untuk explore dan baca library nya, ingat (sudah saatnya kita rajin membaca dokumentasi di phase1)

1. Instalasi Library:
- Pertama, buatlah direktori baru untuk proyek Kalian dan navigasikan ke dalamnya di terminal.
- Jalankan perintah npm init -y untuk membuat file package.json dengan pengaturan default.
- Instal library crypto-js dan moment dengan menjalankan perintah berikut:
npm install crypto-js moment

jangan lupa untuk explore dan baca library nya, ingat (sudah saatnya kita rajin membaca dokumentasi di phase1)

Crypto : https://www.npmjs.com/package/crypto-js

Moment : https://www.npmjs.com/package/moment

2.Enkripsi dan Dekripsi Teks:
- Buatlah file cryptoApp.js.
- Di dalamnya, gunakan library crypto-js untuk membuat aplikasi yang dapat mengenkripsi dan mendekripsi teks yang diberikan.
- Implementasikan dua fungsi, yaitu encrypt dan decrypt, yang menggunakan metode enkripsi dan dekripsi dari library crypto-js.

3. Penjadwalan Tugas dengan Moment:
- Buatlah file scheduleApp.js.
- Di dalamnya, gunakan library moment untuk membuat aplikasi yang menghitung waktu dan menjadwalkan tugas.
- Implementasikan fungsi yang menggunakan moment untuk menghitung waktu tiga hari dari sekarang dan menjadwalkan tugas tertentu.

4. Pengujian Aplikasi:
- Buatlah file index.js untuk menggabungkan fungsi dari cryptoApp.js dan scheduleApp.js.
- Jalankan aplikasi untuk menguji fungsi enkripsi, dekripsi, dan penjadwalan tugas.

**Contoh Implementasi:**

File` cryptoApp.js:`
```js
const CryptoJS = require('crypto-js');

function encrypt(text, key) {
  //code
}

function decrypt(encryptedText, key) {
   //code
}

module.exports = { encrypt, decrypt };
```

File `scheduleApp.js:`
```js
const moment = require('moment');

function scheduleTask() {
  //code
}

module.exports = { scheduleTask };
```

File `index.js`:
```js
const { encrypt, decrypt } = require('./cryptoApp');
const { scheduleTask } = require('./scheduleApp');

console.log('--- Testing cryptoApp ---');

// Test Case 1
const encryptedText = encrypt('Hello, World!', 'mysecretkey');
console.log('Encrypted Text:', encryptedText);
// Output: Encrypted: ... (ciphertext in hexadecimal)

// Test Case 2
const decryptedText = decrypt(encryptedText, 'mysecretkey');
console.log('Decrypted Text:', decryptedText);
// Output: Decrypted: Hello, World!

console.log('--- Testing scheduleApp ---');

// Test Case 3
scheduleTask();
// Output: Scheduled task for: ... (future date and time)
```

**Tugas Tambahan (optional)**
Setelah Kalian selesai mengimplementasikan tugas di atas, Kalian dapat mencoba ekspansi lebih lanjut, seperti membuat antarmuka pengguna sederhana (CLI atau web) untuk berinteraksi dengan aplikasi Kalian, atau menggabungkan lebih banyak fungsionalitas dari library-library lain yang tersedia di NPM. Ini akan membantu Kalian memahami cara menggunakan library-library dari NPM dalam konteks pengembangan aplikasi yang lebih kompleks. 
