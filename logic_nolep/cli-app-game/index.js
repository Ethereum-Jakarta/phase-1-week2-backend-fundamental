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

function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function login() {
    console.clear();
    console.log(chalk.yellow('\n--- Login ---'));

    const username = await question(chalk.blue('Username: '));
    const password = await question(chalk.blue('Password: '));

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        console.log(chalk.red('Username or password incorrect!'));
        return startMenu();
    }

    currentUser = user;
    console.log(chalk.green('Login success.'));
    return mainMenu();
}

async function register() {
    console.clear();
    console.log(chalk.yellow('\n--- Register ---'));

    const username = await question(chalk.blue('Username: '));
    const password = await question(chalk.blue('Password: '));

    const user = users.find(u => u.username === username);
    if(user) {
        console.log(chalk.red('Username already exists.'));
        return startMenu();
    } else {
        users.push({
            username,
            password,
            highestScore: null,
        });

        await saveUsers();
        console.log(chalk.green('Register success.'));
        return startMenu();
    }
}

async function startMenu() {
    console.log(chalk.yellow('\n--- Guessing Game ---'))
    console.log(chalk.white('1. Login'));
    console.log(chalk.white('2. Register'));
    console.log(chalk.white('3. Keluar'));
    const choice = await question(chalk.blue('Pilih opsi: '));

    switch(choice) {
        case "1":
            await login();
            break;
        case "2":
            await register();
            break;
        case "3":
            console.log(chalk.green('GoodBye!'));
            rl.close();
            break;
        default:
            console.log(chalk.red('Invalid choice, chooose number (1-3): '));
            startMenu();
    }
}

async function mainMenu() {
    console.log(chalk.yellow('\n--- Main Menu ---'));
    console.log(chalk.white('1. Mulai Game'));
    console.log(chalk.white('2. Lihat Papan Skor'));
    console.log(chalk.white('3. Logout'));
    const choice = await question(chalk.blue('Pilih opsi: '));

    switch(choice) {
        case "1":
            await playGame();
            break;
        case "2":
            await showLeaderboard();
            break;
        case "3":
            currentUser = null;
            console.log(chalk.green('Logout success.'));
            await startMenu();
            break;
        default:
            console.log(chalk.red('Invalid choice, choose number (1-3): '));
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
        console.log(chalk.red("Nothing score!"));
        return mainMenu();
    }

    users.forEach((u, i) => {
        console.log(chalk.white(`${i + 1}. ${u.username}: ${u.highestScore} percobaan`));
    })

    return mainMenu();
}

function playGame() {
    console.clear();
    console.log(chalk.yellow('\n--- Tebak Angka ---'));
    console.log(chalk.white('Tebak angka antara 1 dan 100'));

    const guessNumber = Math.floor(Math.random() * 100) + 1;
    let temp = 0;

    async function makeGuess() {
        const input = await question(chalk.blue('Tebakan anda: '));
        const number = Number(input);

        temp++;

        if (isNaN(number)) {
            console.log(chalk.red('Input must be number!'));
            return makeGuess();
        } else if (number < guessNumber) {
            console.log(chalk.red('Terlalu rendah!'));
            return makeGuess();
        } else if (number > guessNumber) {
            console.log(chalk.red('Terlalu tinggi!'));
            return makeGuess();
        }

        console.log(chalk.green(`Selamat! anda menebak dengan benar dalam ${temp} percobaan`));

        if (currentUser.highestScore === null || temp < currentUser.highestScore) {
            currentUser.highestScore = temp;
            await saveUsers();
            console.log(chalk.green('Ini adalah skor tertinggi baru anda!'));
        }

        return mainMenu();
    }
    makeGuess();
}

async function main() {
  await loadUsers();
  startMenu();
}

main();