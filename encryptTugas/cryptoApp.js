const CryptoJS = require("crypto-js"); // import module

function encrypt(text, key) {
  return CryptoJS.AES.encrypt(text, key).toString(); // jadi text yg sudah terenkrip
}

function decrypt(encryptedText, key) {
  return CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8); // balik ke text
}

module.exports = { encrypt, decrypt }; // export
