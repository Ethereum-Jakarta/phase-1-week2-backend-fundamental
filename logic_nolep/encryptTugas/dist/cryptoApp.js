import CryptoJS from "crypto-js";
function encrypt(text, key) {
    const encrypted = CryptoJS.AES.encrypt(text, key);
    return encrypted.toString();
}
function decrypt(encryptedText, key) {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}
export { encrypt, decrypt };
//# sourceMappingURL=cryptoApp.js.map