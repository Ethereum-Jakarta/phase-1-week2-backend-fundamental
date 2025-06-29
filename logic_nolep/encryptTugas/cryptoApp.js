import CryptoJS from 'crypto-js';

export function encrypt(text, key) {
    const result = CryptoJS.AES.encrypt(text, key).toString();
    return result;
}

export function decrypt(encryptedText, key) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    const result = bytes.toString(CryptoJS.enc.Utf8);
    return result;
}