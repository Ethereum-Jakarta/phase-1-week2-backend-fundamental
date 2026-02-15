import CryptoJs from "crypto-js";

export function encrypt(text: string, key: string) {
  const aescrypted = CryptoJs.AES.encrypt(text, key).toString();
  const descrypted = CryptoJs.DES.encrypt(aescrypted, key).toString();
  const rabbitcrypted = CryptoJs.Rabbit.encrypt(descrypted, key).toString();
  const result = Buffer.from(rabbitcrypted).toString("hex");
  return result;
}

export function decrypt(encryptedText: string, key: string) {
  const hex = Buffer.from(encryptedText, "hex").toString();
  const rabbitdecrypted = CryptoJs.Rabbit.decrypt(hex, key).toString(CryptoJs.enc.Utf8);
  const desdecrypted = CryptoJs.DES.decrypt(rabbitdecrypted, key).toString(CryptoJs.enc.Utf8);
  const aesdecrypted = CryptoJs.AES.decrypt(desdecrypted, key).toString(CryptoJs.enc.Utf8);
  return aesdecrypted;
}
