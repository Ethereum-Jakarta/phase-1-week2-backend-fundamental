# Logic Nolep (CLI APP GAME)

Pada logic nolep kali ini kalian akan di tugaskan untuk membuat game guessing number di dalam CLI. persyaratan tugas ini:
  1. kalian harus membuat sistem login yang memiliki fitur: login, register, exit
     
     ![image](https://github.com/user-attachments/assets/d5cfa9c3-c98f-43af-82ed-6f6a2e1b16b3)
 
  2. setelah login kalian akan masuk ke Main Menu yang memiliki pilihan Mulai Game, Lihat Papan Sklor, Logout

     ![image](https://github.com/user-attachments/assets/9b43ed35-827b-4f21-b7e9-93a7f809ed55)

  3. Pada Pilihan 2 Lihat Papan Skor tampilkan top 10 score player

     ![image](https://github.com/user-attachments/assets/a1c791a4-5821-4a4d-ae5b-5aafee5de039)

  4. Game Guessing number hanya disuruh menebak angka dari 1 - 100
     - jika angka yang di tulis lebih kecil dari pada angka guess maka akan menampilkan terlalu rendah
       
       ![image](https://github.com/user-attachments/assets/f0090ea6-afae-4e90-823e-34536c2a3229)

     - jika angka yang di tulis lebih besar dari pada angka guess maka akan menampilkan terlalu tinggi
    
       ![image](https://github.com/user-attachments/assets/2df9d570-32d1-4b21-8e0c-3ea8052cd1f2)

     - jika angka benar maka akan memberikan kata selamat dan memberitahu berapa kali kalian menebak angkanya
    
       ![image](https://github.com/user-attachments/assets/ab9df714-23d1-4cdb-8ec3-ad49fa1f0c66)


  5. data harus di simpan menggunakan `.json.`. data yang di simpan ialah username, password, highestScore
  6. wajib menggunakan module `chalk` untuk memperbagus interface CLI
  7. wajib gunakan asyncronous 

gunakan template code di bawah ini:

```js
import readline from 'readline';
import fs from 'fs/promises';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let users = [];
let currentUser = null;

// Baca data pengguna dari file JSON
async function loadUsers() {
  try {
    const data = await fs.readFile('users.json', 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    console.log('Tidak ada file users.json. Akan dibuat file baru.');
  }
}

async function saveUsers() {
  await fs.writeFile('users.json', JSON.stringify(users, null, 2));
}

function login() {
  // tulis code di sini
}

function register() {
  // tulis code di sini
}

function startMenu() {
  // tulis code di sini
}

// ... (kode lainnya tetap sama)

function mainMenu() {
  // tulis code di sini
}

function showLeaderboard() {
  // tulis code di sini
}

function playGame() {
  // tulis code di sini
  }

  makeGuess();
}

// Fungsi utama untuk menjalankan aplikasi
async function main() {
  await loadUsers();
  startMenu();
}

main();
```
