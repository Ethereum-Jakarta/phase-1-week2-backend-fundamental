/**
 * ! encryptTugas: Membuat Aplikasi Pengenkripsi dan Penjadwalan Tugas
 *
 * * Tugas Tambahan (optional) Setelah Kalian selesai mengimplementasikan tugas di atas,
 * * Kalian dapat mencoba ekspansi lebih lanjut, seperti membuat antarmuka pengguna sederhana (CLI atau web) untuk berinteraksi dengan aplikasi Kalian,
 * * atau menggabungkan lebih banyak fungsionalitas dari library-library lain yang tersedia di NPM.
 * * Ini akan membantu Kalian memahami cara menggunakan library-library dari NPM dalam konteks pengembangan aplikasi yang lebih kompleks.
 */

const { encrypt, decrypt } = require("./modules/cryptoApp");
const { scheduleTask } = require("./modules/scheduleApp");

console.log("----- Testing CryptoJS -----");

// Test Case 1
const encryptedText = encrypt("Hello, World!", "mysecretkey");
console.log("Encrypted Text:", encryptedText);
// Output: Encrypted: ... (ciphertext in hexadecimal)

// Test Case 2
const decryptedText = decrypt(encryptedText, "mysecretkey");
console.log("Decrypted Text:", decryptedText);
// Output: Decrypted: Hello, World!

console.log("--- Testing scheduleApp ---");

// Test Case 3
scheduleTask();
// Output: Scheduled task for: ... (future date and time)
