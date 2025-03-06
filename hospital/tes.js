const fs = require('fs');


// Menulis teks ke dalam file secara synchronous
const newText = 'Hello, Node.js!';
fs.writeFileSync('newFile.txt', newText);
console.log('File written successfully.');