const CryptoJS = require('crypto-js');

function encrypt(text, key){
    let cypherText = CryptoJS.AES.encrypt(text, key).toString();
    return cypherText;
}

function decrypt(encryptedText, key){
    let bytes = CryptoJS.AES.decrypt(encryptedText, key);
    return originalText = bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {encrypt, decrypt};

// Testing
// const encryptTest = encrypt('hello world', 'secret key');
// console.log(encryptTest);

// const decryptTest = decrypt(encryptTest, 'secret key');
// console.log(decryptTest);