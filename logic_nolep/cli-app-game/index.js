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
    users = []
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
    console.log(chalk.blue.bold('\n=== Login ==='));
    const username = await question(chalk.yellow('Username: '));
    const password = await question(chalk.yellow('Password: '));

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user
        await saveUsers();
        console.log(chalk.green('Login successful!'));
        await mainMenu();
    } else if (!username.trim() || !password.trim()) {
        console.log(chalk.red("Username dan password tidak boleh kosong.")); return;  
    } else {
        console.log(chalk.red('Invalid username or password'));
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
        console.log(chalk.red('Tidak ada user yang login.'))
    }
}

async function register() {
    console.log(chalk.blue.bold('\n=== Register ==='));
    const username = await question(chalk.yellow('Username: '));
    const password = await question(chalk.yellow('Password: '));

    if (users.some(u => u.username === username)) {
        console.log(chalk.red('Username already exist!'));
    } else if (!username.trim() || !password.trim()) {
        console.log(chalk.red('Username dan password tidak boleh kosong.')); return;
    } else {
        users.push(currentUser = {
            username,
            password,
            highestScore: null
        })
        await saveUsers()
        console.log(chalk.green('Registration successful.'))
        await startMenu();
    }
}

async function startMenu() {
    console.log(chalk.yellow('\n--- Guessing Game ---'));
    console.log('1. Login');
    console.log('2. Register');
    console.log('3. Keluar');
    const choice = await question(chalk.blue('Pilih opsi: '));

    switch (choice) {
        case '1':
            await login();
            break;
        case '2':
            await register();
            break;
        case '3':
            console.log(chalk.green('Goodbye!'));
            rl.close();
            return;
        default:
            console.log(chalk.red('Invalid choice. Please try again.'));
    }

}

// ... (kode lainnya tetap sama)

async function mainMenu() {
    console.log(chalk.yellow('\n--- Main Menu ---'));
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
    }
}

async function showLeaderboard() {
    console.log(chalk.yellow('--- Papan Skor (Top 10) ---'));

    const rankedUsers = users
    .filter(u => u.highestScore !== null)
    .sort((a, b) => a.highestScore - b.highestScore)
    .slice(0, 10);

    if (rankedUsers.length === 0) {
        console.log(chalk.red('Belum ada skor yang tercatat'));
    } else {
        rankedUsers.forEach((u, i) => {
            console.log(chalk.yellow(`${i + 1}. ${u.username}: ${u.highestScore} percobaan`));
        });
    }
    await mainMenu();
}

async function playGame() {
    console.log(chalk.yellow('\n--- Tebak Angka ---'));
    const target = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    while (true) {
        const guess = parseInt(await question(chalk.blue('Tebakan Anda: ')));
        attempts++;

        if (isNaN(guess)) {
            console.log(chalk.red('Invalid angka')) 
            continue;
        }

        if (guess < target) {
            console.log(chalk.yellow('Teralalu rendah!'));
        } else if (guess > target) {
            console.log(chalk.yellow('Teralalu tinggi!'));
        } else {
            console.log(chalk.green(`Selamat! Anda menebak dengan benar dalam ${attempts} percobaan`));
            
            if (currentUser.highestScore === null || attempts < currentUser.highestScore) {
                currentUser.highestScore = attempts;
                console.log(chalk.green('Ini adalah skor tertinggi baru Anda!'));
            }
            await saveUsers();
            break;
        }
    }
    await mainMenu();
  }

// Fungsi utama untuk menjalankan aplikasi
async function main() {
  await loadUsers();
  startMenu();
}

main();