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
    return new Promise((resolve) => {
        console.log(chalk.green('\n=== LOGIN ==='));
        rl.question('Masukkan username: ', (username) => {
            rl.question('Masukkan password: ', (password) => {
                const user = users.find(user => user.username === username && user.password === password);
                user ? (currentUser = user, console.log(chalk.green('Login berhasil!'))) : console.log(chalk.red('Username atau password salah!'));
                resolve();
            });
        });
    });
}

function register() {
    return new Promise((resolve) => {
        console.log(chalk.green('\n=== REGISTER ==='));
        rl.question('Pilih username: ', (username) => {
            // Cek apakah username sudah ada
            const userExists = users.some(user => user.username === username);
            if (userExists) {
                console.log(chalk.red('Username sudah terdaftar!'));
                return resolve();
            }
            rl.question('Buat password: ', async (password) => {
                users.push({ username, password, score: 0 });
                await saveUsers();
                console.log(chalk.green('Registrasi berhasil!'));
                resolve();
            });
        });
    });
}

function startMenu() {
    return new Promise((resolve) => {
        console.log(chalk.yellow('\n=== MENU UTAMA ==='));
        console.log('1. Login');
        console.log('2. Register');
        console.log('3. Keluar');
        rl.question(chalk.blue('Pilih Opsi: '), (answer) => {
            if(answer === '1') {
                console.clear();
                login().then(() => {
                    if (currentUser) {
                        const mainMenuLoop = async () => {
                            let inMainMenu = true;
                            while (inMainMenu) {
                                inMainMenu = await mainMenu();
                            }
                            resolve(true);
                        };
                        mainMenuLoop();
                    } else {
                        resolve(true);
                    }
                });
            } else if(answer === '2'){
                console.clear()
                register().then(() => resolve(true));
            } else if(answer === '3'){
                rl.close();
                console.clear()
                console.log(chalk.bgRedBright('bye bit*ch!'))
                resolve(false);
            } else {
                console.clear()
                console.log(`Inputan salah. Tidak ada menu ${answer}`)
                resolve(true);
            }
        });
    });
}

function mainMenu() {
    return new Promise((resolve) => {
        console.log(chalk.yellow('\n=== MAIN MENU ==='));
        console.log('1. Mulai Game');
        console.log('2. Lihat Papan Skor');
        console.log('3. Logout');
        rl.question(chalk.blue('Pilih Opsi: '), (answer) => {
            if (answer === '1') {
                console.clear();
                playGame().then(() => resolve(true));
            } else if (answer === '2') {
                console.clear();
                showLeaderboard().then(() => resolve(true));
            } else if (answer === '3') {
                currentUser = null;
                console.clear();
                console.log(chalk.green('Logout berhasil!'));
                resolve(false);
            } else {
                console.clear();
                console.log(`Inputan salah. Tidak ada menu ${answer}`);
                resolve(true);
            }
        });
    });
}

function showLeaderboard() {
    return new Promise((resolve) => {
        console.log(chalk.magenta('\n=== Papan Skor (Top 10) ==='));
        if (users.length === 0) {
            console.log('Belum ada user terdaftar.');
            return resolve();
        }
        // Filter user yang sudah punya skor > 0
        const usersWithScore = users.filter(u => u.score && u.score > 0);
        if (usersWithScore.length === 0) {
            console.log('Belum ada skor yang tercatat.');
            return resolve();
        }
        // Urutkan berdasarkan skor terkecil dan ambil 10 teratas
        usersWithScore.sort((a, b) => a.score - b.score);
        usersWithScore.slice(0, 10).forEach((user, idx) => {
            console.log(`${idx + 1}. ${user.username} - Skor: ${user.score}`);
        });
        resolve();
    });
}

function playGame() {
    return new Promise((resolve) => {
        const target = Math.floor(Math.random() * 100) + 1;
        let attempts = 0;
        console.log(chalk.yellow('\n=== TEBAK ANGKA ==='));
        console.log('\nTebak angka 1-100');
        const makeGuess = () => {
            rl.question(chalk.blue('Tebakan Anda: '), (input) => {
                const guess = parseInt(input);
                attempts++;
                if (isNaN(guess) || guess < 1 || guess > 100) {
                    console.log(chalk.red('Input harus angka 1-100!'));
                    makeGuess();
                } else if (guess < target) {
                    console.log(chalk.yellow('Terlalu kecil!'));
                    makeGuess();
                } else if (guess > target) {
                    console.log(chalk.yellow('Terlalu besar!'));
                    makeGuess();
                } else {
                    console.log(chalk.green(`Selamat! Anda menebak dengan benar dengan ${attempts} percobaan`));
                    if (!currentUser.score || attempts < currentUser.score) {
                        currentUser.score = attempts;
                        console.log(chalk.green('Ini adalah skor tertinggi baru Anda!'));
                    }
                    saveUsers().then(() => resolve());
                }
            });
        };
        makeGuess();
    });
}

// Fungsi utama untuk menjalankan aplikasi
async function main() {
    console.clear()
    await loadUsers();
    let running = true

    while(running){
        running = await startMenu()
    }
}

main();