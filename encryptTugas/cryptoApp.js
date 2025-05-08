const CryptoJS = require("crypto-js");

function encrypt(text, key) {
  //code
  var ciphertext = CryptoJS.AES.encrypt(
    text,
    key
  ).toString();

  return ciphertext;
}

function decrypt(encryptedText, key) {
  //code
  var bytes = CryptoJS.AES.decrypt(encryptedText, key);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText;
}

module.exports = { encrypt, decrypt };
