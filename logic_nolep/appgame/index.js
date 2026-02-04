const readline = require('readline');
const fs = require('fs').promises;
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let users = [];
let currentUser = null;

async function loadUsers() {
  try {
    const data = await fs.readFile('users.json', 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    return
  }
}

async function saveUsers() {
  await fs.writeFile('users.json', JSON.stringify(users, null, 2));
}

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function login() {
  console.log(chalk.blue('\n=== LOGIN ==='));
  const username = await askQuestion(chalk.cyan('Masukkan username: '));
  const password = await askQuestion(chalk.cyan('Masukkan password: '));

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    currentUser = user;
    console.log(chalk.green('Login berhasil!'));  
    mainMenu();
  } else {
    console.log(chalk.red('Username atau password salah.'));
    startMenu();
  }
}

async function register() {
  console.log(chalk.blue('\n=== REGISTER ==='));
  const username = await askQuestion(chalk.cyan('Masukkan username baru: '));
  if (users.some(u => u.username === username)) {
    console.log(chalk.red('Username sudah digunakan.'));
    return startMenu();
  }
  const password = await askQuestion(chalk.cyan('Masukkan password: '));
  users.push({ username, password, highestScore: 0 });
  await saveUsers();
  console.log(chalk.green('Registrasi berhasil! Silakan login.'));
  startMenu();
}

function startMenu() {
  console.log(chalk.blue('\n=== MENU UTAMA ==='));
  console.log(chalk.yellow('1. Login'));
  console.log(chalk.yellow('2. Register'));
  console.log(chalk.yellow('3. Exit'));
  
  askQuestion(chalk.cyan('Pilih menu: ')).then(choice => {
    switch (choice) {
      case '1':
        login();
        break;
      case '2':
        register();
        break;
      case '3':
        console.log(chalk.green('Terima kasih! Keluar dari aplikasi.'));
        rl.close();
        break;
      default:
        console.log(chalk.red('Pilihan tidak valid.'));
        startMenu();
    }
  });
}

function mainMenu() {
  if (!currentUser) {
    console.log(chalk.red('\nAnda harus login terlebih dahulu!'));
    return startMenu();
  }
  
  console.log(chalk.blue('\n=== MENU GAME ==='));
  console.log(chalk.yellow('1. Mulai Game'));
  console.log(chalk.yellow('2. Lihat Papan Skor'));
  console.log(chalk.yellow('3. Logout'));

  askQuestion(chalk.cyan('Pilih menu: ')).then(choice => {
    switch (choice) {
      case '1':
        playGame();
        break;
      case '2':
        showLeaderboard();
        break;
      case '3':
        console.log(chalk.green('Logout berhasil!'));
        currentUser = null;
        startMenu();
        break;
      default:
        console.log(chalk.red('Pilihan tidak valid.'));
        mainMenu();
    }
  });
}

function showLeaderboard() {
  if (!currentUser) {
    console.log(chalk.red('\nAnda harus login terlebih dahulu!'));
    return startMenu();
  }
  
  console.log(chalk.blue('\n=== Papan Skor ==='));
  const sortedUsers = users.sort((a, b) => b.highestScore - a.highestScore).slice(0, 10);
  sortedUsers.forEach((user, index) => {
    console.log(chalk.green(`${index + 1}. ${user.username} - Skor Tertinggi: ${user.highestScore}`));
  });
  mainMenu();
}

async function playGame() {
  if (!currentUser) {
    console.log(chalk.red('\nAnda harus login terlebih dahulu!'));
    return startMenu();
  }
  
  console.log(chalk.blue('\n=== Tebak Angka (1-100) ==='));
  const targetNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  async function makeGuess() {
    const guess = parseInt(await askQuestion(chalk.cyan('Tebakan kamu: ')), 10);
    attempts++;

    if (isNaN(guess) || guess < 1 || guess > 100) {
      console.log(chalk.red('Masukkan angka antara 1-100.'));
      return makeGuess();
    }

    if (guess < targetNumber) {
      console.log(chalk.yellow('Terlalu rendah!'));
      return makeGuess();
    } else if (guess > targetNumber) {
      console.log(chalk.yellow('Terlalu tinggi!'));
      return makeGuess();
    } else {
      console.log(chalk.green(`Selamat! Kamu menebak dalam ${attempts} kali percobaan.`));
      if (attempts < currentUser.highestScore || currentUser.highestScore === 0) {
        currentUser.highestScore = attempts;
        await saveUsers();
      }
      mainMenu();
    }
  }

  makeGuess();
}

async function main() {
  await loadUsers();
  startMenu();
}

main();