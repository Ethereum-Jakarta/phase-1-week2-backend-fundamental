import CryptoJS from 'crypto-js';

function encrypt(text, key) {
    try {
        let ciphertext = CryptoJS.AES.encrypt(text, key).toString();
        return ciphertext;
    } catch(error) {
        console.error(error);
        return null;
    }
}

function decrypt(encryptedText, key) {
    try {
        let bytes = CryptoJS.AES.decrypt(encryptedText, key);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (!originalText) console.error('Decryption failed');
        return originalText
    } catch(error) {
        console.error(error);
        return null;
    }
}

export { encrypt, decrypt }