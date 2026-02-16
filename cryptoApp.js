const CryptoJS = require('crypto-js');

function encrypt(text, key) {
  //code
  const b64 = CryptoJS.AES.encrypt(text, key).toString();
  const e64 = CryptoJS.enc.Base64.parse(b64);
  const eHex = e64.toString(CryptoJS.enc.Hex);
  return eHex;
}

function decrypt(encryptedText, key) {
   //code
   const reb64 = CryptoJS.enc.Hex.parse(encryptedText);
   const bytes = reb64.toString(CryptoJS.enc.Base64);
   const decrypt = CryptoJS.AES.decrypt(bytes, key);
   const plain = decrypt.toString(CryptoJS.enc.Utf8);
   return plain;
}

module.exports = { encrypt, decrypt };