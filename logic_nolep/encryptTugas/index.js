const { encrypt, decrypt } = require("./cryptoApp");
const { scheduleTask } = require("./scheduleApp");


console.log('--- Testing cryptoApp ---');
const encryptedText = encrypt("Hello World", "lightsaber")
const decryptText = decrypt(encryptedText, "lightsaber");

console.log("Encrypted Text:", encryptedText)
console.log("Decrypted Text", decryptText)

console.log('--- Testing scheduleApp ---');
scheduleTask()