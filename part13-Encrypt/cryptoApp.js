const CryptoJS = require('crypto-js');

function encrypt(text, key) {
  return CryptoJS.AES.encrypt(text, key).toString();
}

function decrypt(encryptedText, key) {
  const decrypt = CryptoJS.AES.decrypt(encryptedText, key);
  return decrypt.toString(CryptoJS.enc.Utf8);
}
module.exports = { encrypt, decrypt };
