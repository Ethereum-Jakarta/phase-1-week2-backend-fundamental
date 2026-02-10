import CryptoJS from "crypto-js";

function encrypt(text: string, key: string): string {
    const encrypted = CryptoJS.AES.encrypt(text, key);
    return encrypted.toString();
}

function decrypt(encryptedText: string, key: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export { encrypt, decrypt };