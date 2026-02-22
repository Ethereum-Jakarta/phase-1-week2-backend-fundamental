const CryptoJS = require('crypto-js');

function encrypt(text, key) {
    const ciphertext = CryptoJS.AES.encrypt(text, key).toString();
    return ciphertext;
}

function decrypt(encryptedText, key) {
    var bytes  = CryptoJS.AES.decrypt(encryptedText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = { encrypt, decrypt };