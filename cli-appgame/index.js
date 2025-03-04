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


// Fungsi utama untuk menjalankan aplikasi
async function main() {
  await loadUsers();
  startMenu();
}

main();