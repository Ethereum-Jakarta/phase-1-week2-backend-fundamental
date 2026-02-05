import { encrypt, decrypt } from './cryptoApp.js'
import { scheduleTask } from './scheduleApp.js'

console.log('--- Testing cryptoApp ---');

// Test Case 1
const encryptedText = encrypt('Hello, World!', 'mysecretkey');
console.log('Encrypted Text:', encryptedText.encryptedText);
// Output: Encrypted: ... (ciphertext in hexadecimal)

// Test Case 2
const decryptedText = decrypt(encryptedText, 'mysecretkey');
console.log('Decrypted Text:', decryptedText);
// Output: Decrypted: Hello, World!

console.log('--- Testing scheduleApp ---');

// Test Case 3
scheduleTask();
// Output: Scheduled task for: ... (future date and time)