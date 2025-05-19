const CryptoJS = require('crypto-js');

function encrypt(text, key) {
  //code
  let encrypted = CryptoJS.AES.encrypt(JSON.stringify(text), key).toString();
  return encrypted;
}

function decrypt(encryptedText, key) {
   //code
   let bytes = CryptoJS.AES.decrypt(encryptedText, key);
   let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
   
   return decryptedData;
}

module.exports = { encrypt, decrypt };