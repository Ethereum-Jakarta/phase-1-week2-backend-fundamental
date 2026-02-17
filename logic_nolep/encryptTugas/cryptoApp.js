const CryptoJS = require('crypto-js');

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