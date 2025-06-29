import readline from 'readline';
import fs from 'fs/promises';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// let users = [];
// let currentUser = null;

// Baca data pengguna dari file JSON
async function loadUsers() {
    try {
        const data = await fs.readFile('users.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.log('Tidak ada file users.json. Akan dibuat file baru.');
        return [];
    }
}

async function saveUsers(users) {
    await fs.writeFile('users.json', JSON.stringify(users, null, 2));
}

function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function login() {
    // tulis code di sini
    console.clear();
    console.log(chalk.yellow.bold('--- Login ---'));

    const username = await question('Username: ');
    const password = await question('Password: ');

    const users = await loadUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        console.log(chalk.green('Login successful!!'));
        console.log(chalk.cyan(`Welcome back ${username}!!`));
        await question('Tekan enter untuk lanjut..');

        let newSCore = await mainMenu();

        if (newSCore < user.highestScore || user.highestScore === null) {
            user.highestScore = newSCore;
            console.log(chalk.green(`Menyimpan skor tertinggi terbaru... (${username} - ${newSCore} percobaan)`));
        }
        else {
            console.log(chalk.red('Anda belum mengalahkan skor tertinggi anda'));
        }
        await saveUsers(users);
        await question('Tekan enter untuk lanjut..');
    } else {
        console.log(chalk.red('Invalid username or password'));
        await question('Tekan enter untuk lanjut..');
    }
}

async function register() {
    // tulis code di sini
    console.clear();
    console.log(chalk.yellow.bold('--- Register ---'));

    const username = await question('Username: ');
    const password = await question('Password: ');

    const users = await loadUsers();
    if (users.some(u => u.username === username)) {
        console.log('Username already exist');
        await question('Tekan enter untuk lanjut..');
    } else {
        users.push({
            username,
            password,
            highestScore: null
        });
        await saveUsers(users);
        console.log(chalk.green('Registration successful!!'));
        await question('Tekan enter untuk lanjut..');
    }
}

async function startMenu() {
    // tulis code di sini
    while (true) {
        console.log('\n');
        console.log(chalk.yellow.bold('--- Guessing Game ---'));
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
                console.log(chalk.cyan('Goodbyee!!'));
                rl.close();
                return;
            default:
                console.log(chalk.red('Invalid choice. Please try again'));
        }
    }
}

// ... (kode lainnya tetap sama)

async function mainMenu() {
    // tulis code di sini
    let skor = Infinity;
    while (true) {
        console.clear();
        console.log(chalk.yellow.bold('--- Main Menu ---'));
        console.log('1. Mulai Game');
        console.log('2. Lihat Papan Skor');
        console.log('3. Logout');
        const choice = await question(chalk.blue('Pilih opsi: '));

        switch (choice) {
            case '1':
                let newScore = await playGame();
                if (newScore < skor) {
                    skor = newScore;
                    console.log(chalk.green('Ini adalah skor tertinggi terbaru anda!!'));
                    await question('Tekan enter untuk lanjut..');
                }
                break;
            case '2':
                await showLeaderboard();
                break;
            case '3':
                console.log(chalk.cyan('Logout successful!!'));
                console.log(chalk.magenta('Thanks for playing the game!!'));
                await question('Tekan enter untuk lanjut..');
                return skor;
            default:
                console.log(chalk.red('Invalid choice. Please try again'));
        }
    }
}

async function showLeaderboard() {
    // tulis code di sini
    console.clear();
    console.log(chalk.yellow.bold('--- Papan Skor (Top 10) ---'));

    // pakai algoritma merge sort untuk mencari skor tertinggi
    const users = await loadUsers();
    let urut = mergeSort(users);
    // console.log(urut);

    let angka = 1;
    let index = 0;
    while (angka <= 10 && index < urut.length) {
        let data = urut[index];
        console.log(`${angka}. ${data.username}: ${data.highestScore} percobaan`);
        angka++;
        index++;
    }
    await question('Tekan enter untuk lanjut..');
}

function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    // bagi array menjadi 2 bagian
    const tengah = Math.floor(array.length / 2);
    const kiri = array.slice(0, tengah);
    const kanan = array.slice(tengah);

    // bagi terus hingga tersisa satu di masing-masing sisi
    const kubuKiri = mergeSort(kiri);
    const kubuKanan = mergeSort(kanan);

    return merge(kubuKiri, kubuKanan);
}

function merge(kiri, kanan) {
    let hasil = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < kiri.length && rightIndex < kanan.length) {
        if (kiri[leftIndex].highestScore < kanan[rightIndex].highestScore) {
            hasil.push(kiri[leftIndex]);
            leftIndex++;
        } else {
            hasil.push(kanan[rightIndex]);
            rightIndex++;
        }
    }

    return hasil.concat(kiri.slice(leftIndex)).concat(kanan.slice(rightIndex));
}

async function playGame() {
    // tulis code di sini
    let tebak = await makeGuess();
    let skor = 0;

    while (true) {
        console.clear();
        console.log(chalk.yellow.bold('--- Tebak Angka ---'));
        const angka = await question(chalk.blue('Tebakan Anda: '));
        if (angka > tebak) {
            skor++;
            console.log(chalk.yellow('Terlalu tinggi!!'));
            await question('Tekan enter untuk lanjut..');
        } else if (angka < tebak) {
            skor++;
            console.log(chalk.yellow('Terlalu rendah!!'));
            await question('Tekan enter untuk lanjut..');
        } else {
            skor++;
            console.log(chalk.green(`Selamat! Anda menebak dengan benar dalam ${skor} percobaan!!`));
            await question('Tekan enter untuk lanjut..');
            return skor;
        }
    }
}

async function makeGuess() {
    return Math.floor(Math.random() * 100) + 1;
}

// Fungsi utama untuk menjalankan aplikasi
async function main() {
    await loadUsers();
    startMenu();
}

main();