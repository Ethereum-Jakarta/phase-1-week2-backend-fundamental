import CryptoJS from "crypto-js";

function encrypt(text, key) {
    const ciphertext = CryptoJS.AES.encrypt(text, key).toString();
    // console.log("Encrypt AES:", ciphertext);
    return ciphertext;
}

function decrypt(encryptText, key) {
    const bytes = CryptoJS.AES.decrypt(encryptText, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    // console.log("Decrypt AES:", originalText);
    return originalText;
}

// module.exports = { encrypt, decrypt }
export { encrypt, decrypt };