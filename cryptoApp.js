var CryptoJS = require("crypto-js");

function Encrypt(text, key) {
  return CryptoJS.AES.encrypt(text, key).toString();
}

function Decrypt(encryptedText, key) {
  let bytes = CryptoJS.AES.decrypt(encryptedText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = { Encrypt, Decrypt };
