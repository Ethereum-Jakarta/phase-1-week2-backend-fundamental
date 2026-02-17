import readline from 'readline';
import fs from 'fs/promises';
import chalk from 'chalk';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'src', 'db', 'users.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface User {
    username: string,
    password: string,
    highestScore: number;
}

let users: User[] = [];
let currentUser: User | null = null;

async function loadUsers(): Promise<void> {
    try {
        const data: string = await fs.readFile(filePath, 'utf8');
        users = JSON.parse(data);
    } catch (err) {
        console.error('Tidak ada file users.json. Akan dibuat file baru.');
    }
}

async function saveUsers() {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

function ask(query: string) {
    return new Promise<string>((resolve) => rl.question(query, resolve));
}

async function login(): Promise<void> {
    console.log(chalk.yellow('\n--- Login ---'));
    const username: string = await ask('Username: ');
    const password: string = await ask('Password: ');
    const isMatch: User | undefined = users.find(u => u.username === username && u.password === password);

    if (isMatch) {
        currentUser = isMatch;
        console.log(chalk.green(`Login berhasil. Welcome ${isMatch.username}`));
        return mainMenu();
    } else {
        console.log(chalk.red('Wrong username or password!'));
        return startMenu();
    }
}

async function  register(): Promise<void> {
    console.log(chalk.yellow('\n--- Register ---'));
    const username: string = await ask('Username: ');
    const password: string = await ask('Password: ');
    const isExists: User | undefined = users.find(u => u.username === username);

    if (isExists) {
        console.log(chalk.red('Username already exists!'));
        return startMenu();
    } else {
        users.push({
            username,
            password,
            highestScore: 0
        });
        console.log(chalk.green('Regiser berhasil!'));
        await saveUsers();
        return startMenu();
    }
}

async function startMenu(): Promise<void> {
    console.log(chalk.yellow('\n--- Guessing Game ---'));
    console.log(chalk.cyan('1. Login'));
    console.log(chalk.cyan('2. Register'));
    console.log(chalk.cyan('3. Keluar'));
    const choice: string = await ask(chalk.blue('Pilih opsi: '));

    switch (choice) {
        case '1':
            await login();
            break;
        case '2':
            await register();
            break;
        case '3':
            rl.close();
            console.log(chalk.green('GoodBye!'));
            break;
        default:
            console.log(chalk.red('Invalid choice!'));
            return startMenu();
    }
}

async function mainMenu() {
    console.log(chalk.yellow('\n--- Main Menu ---'));
    console.log(chalk.cyan('1. Mulai Game'));
    console.log(chalk.cyan('2. Lihat Papan Skor'));
    console.log(chalk.cyan('3. Logout'));
    const choice: string = await ask(chalk.blue('Pilih opsi: '));

    switch (choice) {
        case '1':
            await playGame();
            break;
        case '2':
            await showLeaderBoard();
            break;
        case '3':
            currentUser = null;
            console.log(chalk.green('Logout berhasil!'));
            return startMenu();
        default:
            console.log(chalk.red('Invalid choice!'));
            return mainMenu();
    }
}

async function showLeaderBoard(): Promise<void> {
    console.log(chalk.yellow('\n--- Papan Skor (Top 10) ---'));

    const sorted: User[] = users.filter(u => u.highestScore !== null).sort((a, b) => a.highestScore - b.highestScore).slice(0, 10);
    if (sorted.length === 0) {
        console.log(chalk.red('Nothing score!'));
        return mainMenu();
    }

    users.forEach((u, i) => {
        console.log(chalk.green(`${i + 1}. ${u.username}: ${u.highestScore} percobaan`));
    });
    return mainMenu();
}

async function playGame() {
    console.log(chalk.yellow('\n--- Tebak angka ---'));
    console.log(chalk.cyan('Tebak angka antara 1 dan 100'));

    const numberGuess: number = Math.floor(Math.random() * 100) + 1;
    let temp: number = 0;

    async function makeGuess() {
        if (!currentUser) {
            return;
        }

        const input: string = await ask(chalk.blue('Tebakan anda: '));
        const num: number = Number(input);

        temp++;

        if (num < numberGuess) {
            console.log(chalk.red('Terlalu rendah!'));
            return makeGuess();
        } else if (num > numberGuess) {
            console.log(chalk.red('Terlalu tinggi!'));
            return makeGuess();
        }

        console.log(chalk.green(`Selamat! Anda menebak dengan benar dalam ${temp} percobaan`));

        if (currentUser?.highestScore === 0 || currentUser?.highestScore > temp) {
            currentUser.highestScore = temp;
            await saveUsers();
            console.log(chalk.green('Ini adalah skor tertinggi terbaru anda!'));
        }
        return mainMenu();
    }
    await makeGuess()
}

async function display() {
    await loadUsers();
    await startMenu();
}

display();