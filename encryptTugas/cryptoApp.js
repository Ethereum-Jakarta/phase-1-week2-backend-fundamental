var CryptoJS = require("crypto-js");

function encrypt(text, key) {
  //code
  let ciphertext = CryptoJS.AES.encrypt(text,key).toString()
  return ciphertext;
}

function decrypt(encryptedText, key) {
   //code
    let bytes  = CryptoJS.AES.decrypt(encryptedText, key);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}


module.exports = { encrypt, decrypt };