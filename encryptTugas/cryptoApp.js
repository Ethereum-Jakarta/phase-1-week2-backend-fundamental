const CryptoJS = require('crypto-js');

function encrypt(text, key) {
  //code
  const encryptedText = CryptoJS.AES.encrypt(text, key);
  return encryptedText.toString()
}

function decrypt(encryptedText, key) {
   //code
   const decrypteText = CryptoJS.AES.decrypt(encryptedText,key);
   return decrypteText.toString(CryptoJS.enc.Utf8);
}

module.exports = { encrypt, decrypt };