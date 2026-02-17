import CryptoJS from 'crypto-js';

export const encrypt = (text, key) => {
    //code
    const encrypted = CryptoJS.AES.encrypt(text, key)
    return encrypted.toString()
}

export const decrypt = (encryptedText, key) => {
    //code
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key)
    return decrypted.toString(CryptoJS.enc.Utf8)
}
