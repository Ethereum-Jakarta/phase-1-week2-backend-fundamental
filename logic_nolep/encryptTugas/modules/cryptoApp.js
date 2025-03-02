const CryptoJS = require("crypto-js");

/**
 * TODO:
 * * Di dalamnya, gunakan library crypto-js untuk membuat aplikasi yang dapat mengenkripsi dan mendekripsi teks yang diberikan.
 * * Implementasikan dua fungsi, yaitu encrypt dan decrypt, yang menggunakan metode enkripsi dan dekripsi dari library crypto-js.
 */

function encrypt(text, key) {
  const ciphertext = CryptoJS.AES.encrypt(text, key).toString();

  return ciphertext;
}

function decrypt(encryptedText, key) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, key);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText;
}

module.exports = { encrypt, decrypt };
