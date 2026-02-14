import CryptoJS from 'crypto-js';

function encrypt(text, key) {
    let chipertext = CryptoJS.AES.encrypt(JSON.stringify(text), key).toString();
    return chipertext;
}

function decrypt(encryptedText, key) {
    let bytes = CryptoJS.AES.decrypt(encryptedText, key);
    let originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return originalText;
}

export { encrypt, decrypt };