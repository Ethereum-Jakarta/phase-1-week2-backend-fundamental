const path = require('path');

//membuat path dinamis untuk multi environment
const dataPath = path.join(__dirname, 'database', process.env.NODE_ENV, 'data.db');
console.log("Database path:", dataPath)

/*
jalankan dengan NODE_ENV yang benar
linux/mac os
-NODE_ENV=production node app.js

windows
set NODE_ENV=production && node app.js

Gantilah production dengan development atau test sesuai kebutuhan
*/

//ekstrak komponen path
const uploadedFile = 'users/john/uploads/profile.jpg';
console.log('File Name:', path.basename(uploadedFile)); //profile.jpg
console.log('Ekstensi:', path.extname(uploadedFile)); ///jpg

/*
Baris	            Fungsi	                         Output
path.basename(...)	Mengambil nama file dari path	'profile.jpg'
path.extname(...)	Mengambil ekstensi file	        '.jpg'
 */