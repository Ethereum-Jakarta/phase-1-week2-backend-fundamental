const { encrypt, decrypt } = require('./src/cryptoApp');
const { scheduleTask } = require('./src/scheduleApp');

console.log('--- Testing cryptoApp ---');

// Test Case 1
const encryptedText = encrypt('Hello, World!', 'mysecretkey');
console.log('Encrypted Text : ', encryptedText);
// Output: Encrypted: ... (ciphertext in hexadecimal)

// Test Case 2
const decryptText = decrypt(encryptedText, 'mysecretkey');
console.log('Decrypted Tect :', decryptText)
// Output: Decrypted: Hello, World!

console.log('--- Testing scheduleApp ---')

// Test Case 3
scheduleTask();
// Output: Scheduled task for: ... (future date and time)