const CryptoJS = require("crypto-js");
let  data = [{id: 1}, {id: 2}]


function encrypt(text, key) {
    //code
    return CryptoJS.AES.encrypt(JSON.stringify(text), key).toString();
  }

function decrypt(encryptedText, key) {
    //code
    const bytes  = CryptoJS.AES.decrypt(encryptedText, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 }
 
 module.exports = { encrypt, decrypt };
