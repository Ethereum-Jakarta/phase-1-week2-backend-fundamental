const CryptoJS = require("crypto-js");

function encrypt(text, key) {
    return CryptoJS.AES.encrypt(JSON.stringify(text), key).toString();
}

function decrypt(encryptedText, key) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

module.exports = { encrypt, decrypt };
