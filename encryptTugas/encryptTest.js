const CryptoJS = require('crypto-js');
var key = CryptoJS.enc.Utf8.parse('4ozcn613nu8irs5x');
var plaintText = '123';
//encrypt
var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7,
});
console.log('plaintText：' + plaintText);
console.log('encryptedData ：' + encryptedData);

var encryptedDataHexStr = encryptedData.toString(CryptoJS.format.Hex);
console.log('encryptedDataHex：' + encryptedDataHexStr);
//-------------------------------------------------------------------------
//decrypt
var encryptedHex = CryptoJS.enc.Hex.parse(encryptedDataHexStr);
var encryptedBase64 = CryptoJS.enc.Base64.stringify(encryptedHex);
console.log('encryptedHex  ：' + encryptedHex);
console.log('encryptedBase64  ：' + encryptedBase64);

var decryptedData = CryptoJS.AES.decrypt(encryptedBase64, key, {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7,
});

let decryptText = decryptedData.toString(CryptoJS.enc.Utf8);
console.log('decryptText ：' + decryptText);