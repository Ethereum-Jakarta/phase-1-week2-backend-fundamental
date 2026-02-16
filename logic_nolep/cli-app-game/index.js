import readline from "readline";
import fs from "fs/promises";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let users = [];
let currentUser = null;

// Baca data pengguna dari file JSON
async function loadUsers() {
  try {
    const data = await fs.readFile("users.json", "utf8");
    users = JSON.parse(data);
  } catch (err) {
    console.log("Tidak ada file users.json. Akan dibuat file baru.");
  }
}

async function saveUsers() {
  await fs.writeFile("users.json", JSON.stringify(users, null, 2));
}

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function login() {
  // tulis code di sini
  console.clear();
  console.log(chalk.blue.bold("=== Login ==="));
  const username = await question(chalk.yellow("Username: "));
  const password = await question(chalk.yellow("Password: "));

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    currentUser = user;
    console.log(chalk.green("login berhasil!"));
    console.log(chalk.cyan(`selamat datang kembali, ${username}!`));
    await mainMenu();
  } else {
    console.log(chalk.red("username atau password yang anda masukan salah"));
  }
}

async function register() {
  // tulis code di sini
  console.clear();
  console.log(chalk.blue.bold("=== Register ==="));
  const username = await question(chalk.yellow("Username: "));
  const password = await question(chalk.yellow("Password: "));

  if (users.some((u) => u.username === username)) {
    console.log(chalk.red("username sudah ada"));
  } else {
    users.push({ username, password, highestScore: null });
    await saveUsers();
    console.log(chalk.green("registrasi berhasil!"));
  }
}

async function startMenu() {
  // tulis code di sini
  while (true) {
    console.log("\n");
    console.log(chalk.yellow("--- Guessing Game ---"));
    console.log("1. Login");
    console.log("2. Register");
    console.log("3. Keluar");
    const choice = await question(chalk.blue("pilih opsi: "));

    switch (choice) {
      case "1":
        await login();
        break;
      case "2":
        await register();
        break;
      case "3":
        console.log(chalk.green("sampai jumpa!"));
        rl.close();
        return;
      default:
        console.log(chalk.red("pilihan tidak valid"));
    }
  }
}

// ... (kode lainnya tetap sama)

async function mainMenu() {
  // tulis code di sini
  while (true) {
    console.log("\n");
    console.log(chalk.yellow("--- Main Menu ---"));
    console.log("1. Mulai Game");
    console.log("2. Lihat Papan Skor");
    console.log("3. Logout");
    const choice = await question(chalk.blue("pilih opsi: "));

    switch (choice) {
      case "1":
        await playGame();
        break;
      case "2":
        await showLeaderboard();
        break;
      case "3":
        console.log(chalk.green(`logout berhasil`));
        return;
      default:
        console.log(chalk.red("pilihan tidak valid"));
    }
  }
}

async function showLeaderboard() {
  // tulis code di sini
  users.sort((a, b) => a.highestScore - b.highestScore);

  let leaderboard = ``;
  let rank = 1;
  let i = 0;
  while (i < users.length && rank <= 10) {
    if (users[i].highestScore !== null) {
      leaderboard += `${rank}. ${chalk.green(users[i].username)}: ${users[i].highestScore} percobaan\n`;
      rank++;
    }
    i++;
  }

  console.clear();
  console.log(chalk.yellow("-- Papan Skor (Top 10) ---"));
  console.log(leaderboard);
  console.log(chalk.yellow("-".repeat(20)));
  await question("tekan enter untuk main menu");
}

async function playGame() {
  // tulis code di sini
  console.clear();
  console.log(chalk.green("mulai permainan! tebak angka antara 1 dan 100."));
  const target = Math.floor(Math.random() * 100) + 1;
  let attemp = 0;

  async function makeGuess() {
    const guess = parseInt(await question("tebakan anda: "));

    if (isNaN(guess)) {
      console.log(chalk.red("masukan angka yang valid!"));
      await makeGuess();
    } else if (guess > target) {
      attemp++;
      console.log(chalk.yellow("Terlalu tinggi!"));
      await makeGuess();
    } else if (guess < target) {
      attemp++;
      console.log(chalk.yellow("Terlalu rendah!"));
      await makeGuess();
    } else {
      attemp++;
      console.log(chalk.green(`selamat! anda menebak dengan benar dalam ${attemp} percobaan`));

      if (attemp < currentUser.highestScore || currentUser.highestScore === null) {
        currentUser.highestScore = attemp;
        saveUsers();
        console.log(chalk.green("ini adalah skor tertinggi baru anda"));
      }
    }
  }

  await makeGuess();
  console.log(chalk.yellow("-".repeat(20)));
  await question("tekan enter untuk main menu");
}

// Fungsi utama untuk menjalankan aplikasi
async function main() {
  await loadUsers();
  startMenu();
}

main();
