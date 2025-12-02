const CryptoJS = require('crypto-js');

function encrypt(text, key) {
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(text), key).toString();
    return ciphertext;
}

function decrypt(encryptedText, key) {
    let bytes = CryptoJS.AES.decrypt(encryptedText, key);
    let decryptData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptData;
}

module.exports = { encrypt, decrypt };