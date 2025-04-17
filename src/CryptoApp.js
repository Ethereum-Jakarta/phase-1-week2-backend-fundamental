import CryptoJS from 'crypto-js'

export function encrypt(text, key) {

    return CryptoJS.AES.encrypt(text, key).toString()

}

export function decrypt(encryptedText, key) {

    return CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8)

}

