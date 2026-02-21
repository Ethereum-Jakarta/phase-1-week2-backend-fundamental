import readline from 'readline';
import fs from 'fs/promises';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let users = [];
let currentUser = null;
let scores = []

// Baca data pengguna dari file JSON
async function loadUsers() {
  try {
    const data = await fs.readFile('users.json', 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    console.log('Tidak ada file users.json. Akan dibuat file baru.');
  }
}

async function loadScores() {
    try {
      const data = await fs.readFile('scores.json', 'utf8');
      scores = JSON.parse(data);
    } catch (err) {
      console.log('Tidak ada file scores.json. Akan dibuat file baru.');
    }
  }

async function saveUsers() {
  await fs.writeFile('users.json', JSON.stringify(users, null, 2));
}

async function saveScores() {
    await fs.writeFile('scores.json', JSON.stringify(scores, null, 2));
  }

function login() {
  // tulis code di sini
  rl.question('Username: ', (username) => {
    rl.question('Password: ', (password) => {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        currentUser = user;
        console.log(chalk.green('Login berhasil!'));
        mainMenu();
      } else {
        console.log(chalk.red('Username atau password salah.'));
        startMenu();
      }
    });
  });
}

function register() {
  // tulis code di sini
  rl.question('Username: ', async (username) => {
    rl.question('Password: ', async (password) => {
      const exists = users.find(u => u.username === username);
      if (exists) {
        console.log(chalk.red('Username sudah terdaftar.'));
        startMenu();
      } else {
        const newUser = { username, password };
        users.push(newUser);
        await saveUsers();
        console.log(chalk.green('Pendaftaran berhasil! Silakan login.'));
        startMenu();
      }
    });
  });
}

function keluar() { 
    console.log('nanti balik lagi ya!!')
    rl.close()
}

function startMenu() {
  // tulis code di sini
  console.log(`\n`)
  console.log(chalk.yellow.bold('=== Guesing Game ==='))
  console.log(('1. Login'))
  console.log(('2. Register'))
  console.log(('3. Keluar'))
  // biki varibele untuk menampilkan opsi menggunakan rl.question
  rl.question(chalk.blue("Pilih Opsi: "), (opsi) => {
    switch(opsi){
        case '1':
            login();
            break;
        case '2':
            register();
            break;
        case '3':
            keluar();
            break;
        default: 
            console.log('opsi tidak valid, silahkan coba lagi.')
            startMenu();
            break;
    }
  })
}

// ... (kode lainnya tetap sama)

function mainMenu() {
  // tulis code di sini
  console.log(`\n`)
  console.log(chalk.yellow.bold('=== Main Menu ==='))
  console.log(('1. Mulai Game'))
  console.log(('2. Lihat Papan Skor'))
  console.log(('3. Logout'))
  rl.question(chalk.blue("Pilih Opsi: "), (opsi) => {
    switch(opsi){
        case '1':
            playGame();
            break;
        case '2':
            showLeaderboard();
            break;
        case '3':
            keluar();
            break;
        default: 
            console.log('opsi tidak valid, silahkan coba lagi.')
            startMenu();
            break;
    }
  })
}

function showLeaderboard() {
  // tulis code di sini
  const topScores = scores.sort((a, b) => b.score - a.score).slice(0, 10);
  console.log(chalk.yellow('=== Top 10 Skor Pemain ==='));
  topScores.forEach((player, index) => {
    console.log(`${index + 1}. ${player.username} - ${player.score}`);
  });
  mainMenu();
}

function playGame() {
  // tulis code di sini
  console.log(chalk.yellow('=== Mainkan Game ==='));
  
  const numberToGuess = Math.floor(Math.random() * 100);

  function makeGuess() {
    rl.question('Tebak angka antara 1 dan 100: ', (answer) => {
      const guess = parseInt(answer);
      if (guess === numberToGuess) {
        console.log(chalk.blue('Tebakanmu'+ " " + guess))
        console.log(chalk.green('Tebakanmu benar!'));
        mainMenu();
      } else if (guess < numberToGuess) {
        console.log(chalk.blue('Tebakanmu'+ " " + guess))
        console.log(chalk.green('Tebakanmu terlalu rendah!'));
        mainMenu();
      }else if (guess > numberToGuess) {
        console.log(chalk.blue('Tebakanmu'+ " " + guess))
        console.log(chalk.green('Tebakanmu terlalu Tinggi!'));
        mainMenu();
      }
    });
  }

  makeGuess();
}

// Fungsi utama untuk menjalankan aplikasi
async function main() {
  await loadUsers();
  await loadScores();
  startMenu();
}

main();
