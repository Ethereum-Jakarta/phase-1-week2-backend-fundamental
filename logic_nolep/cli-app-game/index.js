import readline from 'readline';
import fs from 'fs/promises';
import chalk from 'chalk';

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
    console.log('Tidak ada file users.json. Akan dibuat file baru.');
  }
}

async function saveUsers() {
  await fs.writeFile('users.json', JSON.stringify(users, null, 2));
}

function login() {
  rl.question(chalk.cyan('Username: '), (username) => {
    rl.question(chalk.cyan('Password: '), (password) => {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        currentUser = user;
        console.log(chalk.green(`Login berhasil! Welcome, ${username}`));
        mainMenu();
      } else {
        console.log(chalk.red('Username atau password salah.'));
        startMenu();
      }
    });
  });
}

function register() {
  rl.question(chalk.cyan('Username: '), (username) => {
    rl.question(chalk.cyan('Password: '), (password) => {
      if (users.find(u => u.username === username)) {
        console.log(chalk.red('Username sudah terdaftar.'));
        startMenu();
      } else {
        const newUser = { username, password, highestScore: 0 };
        users.push(newUser);
        console.log(chalk.green('Registrasi berhasil!'));
        saveUsers();
        currentUser = newUser;
        mainMenu();
      }
    });
  });
}

function startMenu() {
  console.log(chalk.blue('\nPilih opsi:'));
  console.log('1. Login');
  console.log('2. Register');
  console.log('3. Exit');

  rl.question(chalk.cyan('Pilih menu: '), (choice) => {
    switch (choice) {
      case '1':
        login();
        break;
      case '2':
        register();
        break;
      case '3':
        rl.close();
        break;
      default:
        console.log(chalk.red('Pilihan tidak valid.'));
        startMenu();
        break;
    }
  });
}

function mainMenu() {
  console.log(chalk.blue('\nMain Menu:'));
  console.log('1. Mulai Game');
  console.log('2. Lihat Papan Skor');
  console.log('3. Logout');

  rl.question(chalk.cyan('Pilih menu: '), (choice) => {
    switch (choice) {
      case '1':
        playGame();
        break;
      case '2':
        showLeaderboard();
        break;
      case '3':
        currentUser = null;
        startMenu();
        break;
      default:
        console.log(chalk.red('Pilihan tidak valid.'));
        mainMenu();
        break;
    }
  });
}

function showLeaderboard() {
  console.log(chalk.yellow('\nPapan Skor Top 10:'));
  const sortedUsers = users.sort((a, b) => b.highestScore - a.highestScore).slice(0, 10);
  sortedUsers.forEach((user, index) => {
    console.log(`${index + 1}. ${user.username} - Score: ${user.highestScore}`);
  });
  mainMenu();
}

function playGame() {
  const target = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  console.log(chalk.green('\nMulai permainan! Tebak angka antara 1 dan 100.'));
  
  function makeGuess() {
    rl.question(chalk.cyan('Masukkan tebakan: '), (input) => {
      const guess = parseInt(input);

      if (isNaN(guess)) {
        console.log(chalk.red('Masukkan angka yang valid.'));
        makeGuess();
      } else {
        attempts++;
        if (guess < target) {
          console.log(chalk.yellow('Terlalu rendah!'));
          makeGuess();
        } else if (guess > target) {
          console.log(chalk.yellow('Terlalu tinggi!'));
          makeGuess();
        } else {
          console.log(chalk.green(`Selamat! Anda menebak angka dengan benar! Tebakan: ${attempts} kali.`));
          if (attempts < currentUser.highestScore || currentUser.highestScore === 0) {
            currentUser.highestScore = attempts;
            saveUsers();
            console.log(chalk.green(`Score terbaik Anda disimpan: ${currentUser.highestScore}`));
          }
          mainMenu();
        }
      }
    });
  }

  makeGuess();
}

// Fungsi utama untuk menjalankan aplikasi
async function main() {
  await loadUsers();
  startMenu();
}

main();
