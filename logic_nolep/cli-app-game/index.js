import readline from 'readline';
import fs from 'fs/promises';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// fungsi  untuk memberikan pertanyaan pada user, untuk asynchronous
function question(query) {
    return new Promise((resolve, reject) => {
        rl.question(query, resolve)
    })
}

let users = [];
let currentUser = null;

// Baca data pengguna dari file JSON
async function loadUsers() {
    try {
        const data = await fs.readFile('users.json', 'utf8');
        users = JSON.parse(data);
        return users
    } catch (err) {
        console.log('Tidak ada file users.json. Akan dibuat file baru.');
        return [];
    }
}

async function saveUsers(users) {
    await fs.writeFile('users.json', JSON.stringify(users, null, 2));
}

async function login() {
    console.clear();
    console.log(chalk.blue.bold("====Login==="));
    const username = await question(chalk.yellow('Username: '));
    const password = await question(chalk.yellow("Password: "));

    users = await loadUsers();
    const find = users.find(u => u.status === "online");
    if (find) return console.log(chalk.red("Someone has logged in"));

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        user.status = "online";
        user.lastLogin = new Date().toISOString();
        currentUser = user;
        await saveUsers(users);
        await mainMenu();
    } else {
        console.log(chalk.red('Invalid username or passsword'));
    }
}

async function register() {
    console.clear();
    console.log(chalk.blue.bold("===Register===="));
    const username = await question(chalk.yellow("Choose a username: "));
    const password = await question(chalk.yellow("Choose a password: "));

    users = await loadUsers();
    if (users.some(u => u.username === username)) {
        console.log(chalk.red("Username alreadye exists"));
    } else {
        users.push({
            username,
            password,
            status: "offline",
            lastLogin: null,
            bestScore: null
        });
        await saveUsers(users);
        console.log(chalk.green("Registration successfull!"))
    }
}

async function logout() {
    console.clear();
    console.log(chalk.blue.bold("===Logout==="));
    const username = await question(chalk.yellow("Enter your username: "));

    users = await loadUsers();
    const user = users.find(u => u.username === username);

    if (user && user.status === "online") {
        user.status = "offline";
        await saveUsers(users);
        console.log(chalk.green(`${username} has been logged out`))
    } else {
        console.log(chalk.red("User no found or not logged in."))
    }
}

async function startMenu() {
    while (true) {
        console.log("\n");
        console.log(chalk.blue.bold("===Guessing Game==="));
        console.log(chalk.yellow("1. Login"));
        console.log(chalk.yellow("2. Register"));
        console.log(chalk.yellow("3. Logout"));
        const choice = await question(chalk.magenta("Enter your choice (1-3): "))

        switch (choice) {
            case "1":
                await login();
                break;
            case "2":
                await register();
                break;
            case "3":
                await logout();
                break;
            default:
                console.log(chalk.red("Invalid choice. Please try again!"))
        }
    }
}

// ... (kode lainnya tetap sama)

async function mainMenu() {
    while (true) {
        console.clear();
        console.log("\n");
        console.log(chalk.blue.bold("===Main Menu==="));
        console.log("1. Mulai Game");
        console.log("2. Lihat Papan Skor");
        console.log("3. Logout");
        const choice = await question(chalk.magenta("Choose a option (1-3): "))

        switch (choice) {
            case "1":
                await playGame();
                break;
            case "2":
                await showLeaderboard();
                break;
            case "3":
                await logout();
                return;
            default:
                console.log(chalk.red("Invalid choice. Please try again!"));
        }
        console.log(chalk.gray("\nTekan Enter untuk kembali ke menu..."));
        await question(""); // pause sementara sebelum menu tampil ulang
    }
}

async function showLeaderboard() {
    console.clear();
    console.log("\n");
    console.log(chalk.blue.bold("===Papan Skor(Top 10)==="))
    users = await loadUsers();
    // console.log(users);

    const usersWithScore = users.filter(u => u.bestScore !== undefined).sort((a, b) => a.bestScore - b.bestScore)

    if (usersWithScore.length === 0) {
        console.log("Belum ada score untuk di tampilkan")
    } else {
        for (let i = 0; i < usersWithScore.length; i++) {
            if (i < 10) {
                console.log(`${i + 1}. ${chalk.green(usersWithScore[i].username)}: ${usersWithScore[i].bestScore} percobaan`)
            }
        }
    }
}

let targetNumber = 0;
let guessCount = 0;
async function playGame() {
    console.clear();
    console.log("\n");
    console.log(chalk.blue.bold("===Tebak Angka==="));
    console.log(chalk.magenta("Tebak angka antara 1 sampai 100"));

    targetNumber = Math.floor(Math.random() * 100) + 1;
    guessCount = 0;

    await makeGuess()
}

async function makeGuess() {
    const answer = await question(chalk.blue("Tebakan anda: "));
    const guess = +answer;

    guessCount++;
    if (guess < targetNumber) {
        console.log(chalk.yellow("Terlalu rendah!"));
        await makeGuess()
    } else if (guess > targetNumber) {
        console.log(chalk.yellow("Terlalu tinggi"));
        await makeGuess()
    } else {
        console.log(chalk.green(`Selamat! Anda menebak dengan benar dalam ${guessCount} percobaan.`))
        console.log(chalk.green("Ini adalah skor tertinggi baru anda"));
        if (!currentUser.bestScore || guessCount < currentUser.bestScore) {
            currentUser.bestScore = guessCount;
        } else {
            console.log(chalk.cyan("Tebakan benar, tapi belum mengalahkan skor terbaik anda."));
        }

        await saveUsers(users)
    }
};


// Fungsi utama untuk menjalankan aplikasi
async function main() {
    await loadUsers();
    startMenu();
}

main();