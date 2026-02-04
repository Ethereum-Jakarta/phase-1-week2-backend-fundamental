const { encrypt, decrypt } = require('./cryptoApp'); 
const { scheduleTask } = require('./scheduleApp');

console.log('--- Testing cryptoApp ---');
const encryptedText = encrypt('Hello, World!', 'mysecretkey');
console.log('Encrypted Text:', encryptedText);

const decryptedText = decrypt(encryptedText, 'mysecretkey');
console.log('Decrypted Text:', decryptedText);

console.log('--- Testing scheduleApp ---');
scheduleTask();

