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

async function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function login() {
    // console.clear();
    console.log('\n');
    console.log(chalk.blue.bold('=== Login ==='));
    const username = await question(chalk.yellow('Username: '));
    const password = await question(chalk.yellow('Password: '));  
    
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        console.log(chalk.green('Login Successful!'));
        console.log(chalk.cyan(`Welcome ${username}`));
        await mainMenu();
    } else {
        console.log(chalk.red('Invalid username or password.'));
        await startMenu();
    }
}

async function register() {
    // console.clear();
    console.log('\n');
    console.log(chalk.blue.bold('=== Register ==='));
    const username = await question(chalk.yellow('Choose a username: '));
    const password = await question(chalk.yellow('Choose a password: '));

    if (users.some(u => u.username === username)) {
        console.log(chalk.red('Username already exist.'))
        return startMenu();
    } else {
        users.push({
            username,
            password,
            highestScore: null
        });
        await saveUsers();
        console.log(chalk.green('Registration successful!'));
        await startMenu();
    }
}

async function logout() {
    console.log(chalk.blue.bold('=== Logout ==='));
    if (currentUser) {
        console.log(chalk.green(`${currentUser.username} has been logged out.`));
        currentUser = null;
        await startMenu();
    } else {
        console.log(chalk.red('No user is currently logged in.'));
        await mainMenu();
    }
}

async function startMenu() {
    // console.clear();
    console.log('\n');
    console.log(chalk.yellow('--- Guessing Game ---'));
    console.log('1. Login');
    console.log('2. Register');
    console.log('3. Keluar: ');
    const choice = await question(chalk.blue('Pilih opsi: '));

    switch (choice) {
        case '1':
            await login();
            break
        case '2':
            await register();
            break;
        case '3':
            console.log(chalk.green('Goodbye!'));
            rl.close();
            return;
        default:
            console.log(chalk.red('Invalid choice. Please try again.'));
            await startMenu();
            break;
    }
}

// ... (kode lainnya tetap sama)

async function mainMenu() {
    console.log('\n');
    console.log(chalk.yellow('--- Main Menu ---'));
    console.log('1. Mulai Game');
    console.log('2. Lihat Papan Skor');
    console.log('3. Logout');
    const choice = await question(chalk.blue('Pilih opsi: '));

    switch (choice) {
        case '1':
            await playGame();
            break;
        case '2':
            await showLeaderboard();
            break;
        case '3':
            await logout();
            break;
        default:
            console.log(chalk.red('Invalid choice. Please try again.'));
            await mainMenu();
            break;
    }
}

async function showLeaderboard() {
    console.log('\n');
    console.log(chalk.yellow('--- Papan Skor (Top 10) ---'));

    const sorted = users
    .filter(u => u.highestScore !== null)
    .sort((a, b) => a.highestScore - b.highestScore)
    .slice(0, 10);

    if (sorted.length === 0) {
        console.log(chalk.gray('No score has been recorded yet.'))
    } else {
        sorted.forEach((u, i) => {
            console.log(`${i + 1}. ${u.username}: ${u.highestScore} percobaan`);
        });
    }

    await mainMenu();
}

async function playGame() {
    console.log('\n');
    console.log(chalk.yellow('--- Tebak Angka ---'));
    console.log('Tebaka angka antara 1 dan 100');

    const target = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    async function makeGuess() {
        const guess = parseInt(await question(chalk.cyan('Tebakan Anda: ')), 10);
        attempts++;

        if (guess < target) {
            console.log(chalk.red('Terlalu rendah'));
            await makeGuess();
        } else if (guess > target) {
            console.log(chalk.red('Terlalu tinggi'));
            await makeGuess();
        } else {
            console.log(chalk.green(`Selamat! Anda menebak dengan benar dalam ${attempts} percobaan.`));

            if (currentUser.highestScore === null || attempts < currentUser.highestScore) {
                currentUser.highestScore = attempts;
                await saveUsers();
                console.log(chalk.magenta('Ini adalah skor tertinggi baru Anda!'));
            }
            await mainMenu()
        }
    }
    makeGuess();
}


// Fungsi utama untuk menjalankan aplikasi
async function main() {
  await loadUsers();
  startMenu();
}

main();