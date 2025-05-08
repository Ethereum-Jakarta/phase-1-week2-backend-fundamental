import readline from "readline";
import fs from "fs/promises";
import chalk from "chalk";
import readlineSync from "readline-sync";

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
    if (!data) {
      await fs.writeFile("users.json", JSON.stringify(users, null, 2));
    }
    users = JSON.parse(data);
  } catch (err) {
    return users;
    console.log("Tidak ada file users.json. Akan dibuat file baru.");
  }
  return users;
}

async function saveUsers() {
  await fs.writeFile("users.json", JSON.stringify(users, null, 2));
}

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function login() {
  // tulis code di sini
  console.log("\n");
  console.log(chalk.blackBright("--- Login ---"));
  const username = await question(chalk.whiteBright("Username: "));
  const password = await question(chalk.whiteBright("Password: "));

  await loadUsers();
  const validGetUser = users.find(
    (u) => u.username === username && u.password === password
  );
  if (validGetUser) {
    validGetUser.status = "online";
    validGetUser.lastLogin = new Date().toISOString();
    currentUser = username;
    await saveUsers();
    console.log(chalk.greenBright("Login successfully!"));
  } else {
    console.log(chalk.red("username or password wrong!"));
    await startMenu();
  }
}

async function register() {
  // tulis code di sini
  console.log("\n");
  console.log(chalk.blueBright("--- register ---"));
  const username = await question(chalk.whiteBright("Input Username: "));
  const password = await question(chalk.whiteBright("Input Password: "));
  const getUser = await loadUsers();

  if (users.some((u) => u.username === username)) {
    console.log(chalk.red("Username already taken"));
  } else {
    getUser.push({
      username,
      password,
      score: null,
      status: "offline",
      lastLogin: null,
    });
    await saveUsers();
    console.log(chalk.green("Register successfully!"));
  }
}

async function startMenu() {
  // tulis code di sini
  while (true) {
    console.log("\n");
    console.log(chalk.yellow("--- Guessing Game ---"));
    console.log(chalk.whiteBright("1. Login"));
    console.log(chalk.whiteBright("2. register"));
    console.log(chalk.whiteBright("3. Exit"));
    const choice = await question(chalk.blue("Pilih Opsi: "));

    switch (choice) {
      case "1":
        await login();
        await mainMenu();
        break;
      case "2":
        await register();
        break;
      case "3":
        console.log(chalk.greenBright("See you later..."));
        rl.close();
        return
      default:
        console.log(chalk.red("There is no such option!"));
    }
  }
}

async function logout() {
  console.log("\n");
  console.log(chalk.yellow("--- Logout ---"));
  const username = await question(chalk.whiteBright("Enter Username: "));
  await loadUsers();
  const validGetUser = users.find((u) => u.username === username);

  if (validGetUser) {
    validGetUser.status = "offline";
    await saveUsers();
    currentUser = null;
    console.log(chalk.green("Logout successfully"));
  } else {
    console.log(chalk.red("Username is not found!"));
  }
}

// ... (kode lainnya tetap sama)

async function mainMenu() {
  while (true) {
    console.log("\n");
    console.log(chalk.yellow("--- Main Menu ---"));
    console.log(chalk.whiteBright("1. Mulai Game"));
    console.log(chalk.whiteBright("2. Lihat Papan Skor"));
    console.log(chalk.whiteBright("3. logout"));
    const choice = await question(chalk.blue("Pilih Opsi: "));

    switch (choice) {
      case "1":
        await playGame();
        break;
      case "2":
        await showLeaderboard();
        break;
      case "3":
        await logout();
        await startMenu();
        break;
      default:
        console.log(chalk.red("There is no such option!"));
    }
  }
  // tulis code di sini
}

async function showLeaderboard() {
  // tulis code di sini
  console.log("\n");
  console.log(chalk.yellow("--- Papan skor (Top 10) ---"));
  await loadUsers();
  let userTop = users.filter((u) => u.score).sort((a, b) => {return Number(a.score) - Number(b.score)}).slice(0, 10)
  userTop.forEach((elemen, index) => {
    console.log(`${index + 1}. ${elemen.username}: ${elemen.score} percobaan`)
  })
}

async function playGame() {
  // tulis code di sini
  console.log("\n");
  console.log(chalk.yellow("--- Tebak Angka ---"));
  console.log(chalk.white("Tebak angka dari 1 sampai 10"));
  let win = false;
  let count = 1;

  while (!win) {
    const randomNum = Math.ceil(Math.random() * 10).toString();
    const player = await question(chalk.blue("Tebakan anda: "));
    if (player === randomNum) {
      console.log(
        chalk.greenBright(
          `Selamat!, anda menebak dengan benar dalam ${count} percobaan \nini adalah skor tertinggi baru anda`
        )
      );
      if (currentUser) {
        win = true;
        await loadUsers();

        let getUser = users.find((u) => u.username === currentUser);
        if (getUser) {
          getUser.score = count;
          await saveUsers(users);
        } else {
          console.log(chalk.red("Username is not found!"));
        }
      }
    } else if (player > randomNum) {
      console.log(chalk.yellowBright("Terlalu rendah tebak lagi!"));
      count++;
    } else if (player < randomNum) {
      console.log(chalk.yellowBright("Terlalu tinggi tebak lagi atuh!"));
      count++;
    } else {
      console.log(chalk.red("Ngarang antum!"));
    }
  }
}

// Fungsi utama untuk menjalankan aplikasi
async function main() {
  await loadUsers();
  startMenu();
}

main();
