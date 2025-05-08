const CryptoJS = require('crypto-js')

function encrypt(text, key) {
    const ciphertext = CryptoJS.AES.encrypt(text, key).toString()
    return ciphertext
}

function decrypt(encryptText, key){
    const bytes = CryptoJS.AES.decrypt(encryptText, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText

}

module.exports = { encrypt, decrypt }