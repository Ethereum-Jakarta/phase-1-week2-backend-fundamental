const CryptoJS = require('crypto-js');

function encrypt(text, key) {
  //code
  const ciphertext = CryptoJS.AES.encrypt(text, key).toString();
  return ciphertext
}

function decrypt(encryptedText, key) {
   //code
   let bytes  = CryptoJS.AES.decrypt(encryptedText, key);
   let originalText = bytes.toString(CryptoJS.enc.Utf8);

   return originalText
}

// const testEncrypt =  encrypt('Hello World!', 'secret key 123')
// console.log(testEncrypt);

// const testDecrypt = decrypt(testEncrypt, 'secret key 123')
// console.log(testDecrypt)


module.exports = { encrypt, decrypt};