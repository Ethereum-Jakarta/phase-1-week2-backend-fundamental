import readline from 'readline';
import fs from 'fs/promises';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let users = [];
let currentUser = null;

function ask(q) {
    return new Promise ((resolve) => rl.question(q, resolve));
}

// Baca data pengguna dari file JSON
async function loadUsers() {
  try {
    const data = await fs.readFile('users.json', 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    console.log('Tidak ada file users.json. Akan dibuat file baru.');
    users = [];
  }
}

async function saveUsers() {
  await fs.writeFile('users.json', JSON.stringify(users, null, 2));
}

async function login() {
    console.log(chalk.blue.bold('\n--- Login ---'));

    const username = await ask(chalk.yellow('Username: '));
    const password = await ask(chalk.yellow('Password: '));

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        console.log(chalk.red('Login invalid'));
        return startMenu();
    }

    currentUser = user;
    console.log(chalk.green('Login successful'));
    return mainMenu();
}

async function register() {
    console.log(chalk.blue.bold('\n--- Register ---'));

    const username = await ask(chalk.yellow('Username: '));
    const password = await ask(chalk.yellow('Password: '));

    const user = users.find(u => u.username === username);

    if (user) {
        console.log(chalk.red('Username already use'))
        return startMenu();
    }

    users.push({
        username,
        password,
        highestScore: null
    })
    
    await saveUsers();
    console.log(chalk.green('Register success'));
    return startMenu();
}

async function startMenu() {
    console.log(chalk.yellow('\n--- Guessing Game ---'));

    console.log(chalk.grey('1. Login'));
    console.log(chalk.grey('2. Register'));
    console.log(chalk.grey('3. Keluar'));
    
    const choice = await ask(chalk.blue('Pilih Opsi: '));

    switch (choice) {
        case '1':
            return login();
        case '2':
            return register();
        case '3':
            console.log(chalk.green('GoodBye!'));
            rl.close();
            break;
        default:
            console.log(chalk.red('Invalid choice'));
            startMenu();
    }  
}

// ... (kode lainnya tetap sama)

async function mainMenu() {
    console.log(chalk.yellow('\n--- Main Menu ---'));

    console.log(chalk.grey('1. Mulai Game'));
    console.log(chalk.grey('2. Lihat Papan Skor'));
    console.log(chalk.grey('3. Logout'));

    const choice = await ask(chalk.blue('Pilih Opsi: '));

    switch(choice) {
        case '1':
            return playGame();
        case '2':
            return showLeaderboard();
        case '3':
            currentUser = null;
            console.log(chalk.green(`Log out successs`))
            return startMenu();
        default:
            console.log('Invalid choice');
            mainMenu();
    }
}

function showLeaderboard() {
    console.log(chalk.yellow('\n--- Papan Skor (Top 10) ---'));

    const sorted = users
    .filter(u => u.highestScore !== null)
    .sort((a, b) => a.highestScore - b.highestScore)
    .slice(0, 10);

    if (sorted.length === 0) {
        console.log('Nothing score');
        return mainMenu();
    }

    sorted.forEach((u, i) => {
        console.log(`${i + 1}. ${u.username} ${u.highestScore} percobaan`);
    });

    return mainMenu();
}

function playGame() {
    console.log(chalk.yellow('\n--- Tebak Angka ---'));
    console.log('Tebak angka antar 1 - 100');

    const guessNumber = Math.floor(Math.random() * 100) + 1;
    let temp = 0;

    async function makeGuess() {
        const input = await ask(chalk.cyan('Tebakan Anda: '));
        const num = Number(input);

        temp++;

        if (isNaN(num)) {
            console.log(chalk.red('Input must be number'));
            return makeGuess();
        } else if (num < guessNumber) {
            console.log(chalk.red('Terlalu rendah!'));
            return makeGuess();
        } else if (num > guessNumber) {
            console.log(chalk.red('Terlalu tinggi!'));
            return makeGuess();
        }

        console.log(chalk.green(`\nSelamat anda menebak dengan benar dalam ${temp} percobaan.`));

        if (currentUser.highestScore === null || temp < currentUser.highestScore) {
            currentUser.highestScore = temp;
            console.log(chalk.green('Ini adalah skor tertinggi baru anda!'));
            await saveUsers();
        }
        return mainMenu();
    }
}


// Fungsi utama untuk menjalankan aplikasi
async function main() {
  await loadUsers();
  startMenu();
}

main();