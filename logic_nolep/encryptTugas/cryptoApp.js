const CryptoJS = require("crypto-js");

function encrypt(text, key) {
  //code
  return CryptoJS.AES.encrypt(text, key).toString();
}

function decrypt(encryptedText, key) {
  //code
  return CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
}

module.exports = { encrypt, decrypt };
