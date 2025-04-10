const CryptoJS = require('crypto-js')

function encrypt(text, key){
    const cipherText = CryptoJS.AES.encrypt(text, key).toString()
    return cipherText
}

function decrypt(encryptedText, key) {
    //code
    const bytes = CryptoJS.AES.decrypt(encryptedText, key)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)

    return originalText
 }

module.exports = { encrypt, decrypt}