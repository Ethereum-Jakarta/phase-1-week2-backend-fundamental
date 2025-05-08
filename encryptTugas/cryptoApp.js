// encrypt & decrypt
const CryptoJS = require('crypto-js');

// AES Encryption
// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

function encrypt(text, key) {
  //code
  return CryptoJS.AES.encrypt(text, key).toString();
}

function decrypt(encryptedText, key) {
   //code
   const bytes = CryptoJS.AES.decrypt(encryptedText, key);
   return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = { encrypt, decrypt };