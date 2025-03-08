// Tempatkan fungsi 'generateSecretKey' dalam proyek Anda 
const CryptoJS = require('crypto-js');


  function encrypt(plaintext, key) {
    let cipherText = CryptoJS.AES.encrypt(plaintext, key);
    return cipherText.toString();
    }

  function decrypt(encryptedText, key) {
    let decrypted = CryptoJS.AES.decrypt(encryptedText, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}  



module.exports = { encrypt, decrypt };