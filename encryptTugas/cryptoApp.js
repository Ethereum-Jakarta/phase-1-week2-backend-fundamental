const CryptoJs = require('crypto-js');

const encrypt = (text, key) => {
  let base64 = CryptoJs.AES.encrypt(text, key).toString();
  let eSixtyFour = CryptoJs.enc.Base64.parse(base64);
  let eHex = eSixtyFour.toString(CryptoJs.enc.Hex);
  return eHex;
};

const decrypt = (encryptedText, key) => {
  let reb64 = CryptoJs.enc.Hex.parse(encryptedText);
  let bytes = reb64.toString(CryptoJs.enc.Base64);
  let decrypt = CryptoJs.AES.decrypt(bytes, key);
  let plain = decrypt.toString(CryptoJs.enc.Utf8);
  return plain;
};

module.exports = { encrypt, decrypt };
