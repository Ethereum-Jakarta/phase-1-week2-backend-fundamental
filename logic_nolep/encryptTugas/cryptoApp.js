import CryptoJS from "crypto-js";

function encrypt(text, key) {  
    let ciphertext = CryptoJS.AES.encrypt(text, key).toString();
    return ciphertext;
}

function decrypt(encryptedText, key) {
    let bytes = CryptoJS.AES.decrypt(encryptedText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export { encrypt, decrypt };