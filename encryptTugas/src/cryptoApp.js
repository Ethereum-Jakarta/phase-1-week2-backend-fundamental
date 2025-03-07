const CryptoJS = require("crypto-js");

const encrypt = (text, key) => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

const decrypt = (encryptedText, key) => {
    let bytes = CryptoJS.AES.decrypt(encryptedText, key)
    let originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
};

module.exports = { encrypt, decrypt };
