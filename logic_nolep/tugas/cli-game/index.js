import readline from "readline";
import { readFile, writeFile } from "fs/promises";
import chalk from "chalk";
import { randomInt } from "crypto";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl._writeToOutput = function _writeToOutput(stringToWrite) {
  if (this.stdoutMuted) {
    if (["\r\n", "\n", "\r"].includes(stringToWrite)) {
      process.stdout.write(stringToWrite);
    } else {
      process.stdout.write("*");
    }
  } else {
    process.stdout.write(stringToWrite);
  }
};

let users = [];
let currentUser = null;

function question(query) {
  return new Promise((resolve) => {
    const isPassword = /password/gi.test(query);

    rl.question(query, (answer) => {
      if (isPassword) {
        rl.stdoutMuted = false;
        process.stdout.write("\n");
      }
      resolve(answer);
    });

    if (isPassword) {
      rl.stdoutMuted = true;
    }
  });
}

async function loadUsers() {
  try {
    const data = await readFile("users.json", "utf8");
    users = JSON.parse(data);
    currentUser = users.find((u) => u.isLogin);
  } catch (err) {
    console.log("Tidak ada file users.json. Akan dibuat file baru.");
  }
}

async function saveUsers() {
  await writeFile("users.json", JSON.stringify(users, null, 2));
}

async function login() {
  console.clear();
  console.log(chalk.yellow.bold("=== Login ==="));
  const username = await question("Enter your username: ");
  const password = await question("Enter Password: ", true);

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    console.log(chalk.red("Invalid username or password"));
    await question("Press Enter to continue...");
    return startMenu();
  }

  user.isLogin = true;
  currentUser = user;
  await saveUsers();

  console.clear();
  console.log(chalk.green(`Welcome back, ${currentUser.username}!`));
  mainMenu();
}

async function register() {
  console.clear();
  console.log(chalk.yellow.bold("=== Register ==="));
  const username = await question("Enter your username: ");
  const password = await question("Enter Password: ");

  if (users.some((u) => u.username === username)) {
    console.log("User already exist");
    await question("Press Enter to continue...");
    return startMenu();
  }
  users.push({
    username: username,
    password: password,
    percobaan: null,
    isLogin: false,
  });

  await saveUsers();
  console.log(chalk.green("Registration successful!"));
  startMenu();
}

async function logout() {
  console.clear();
  if (currentUser) {
    currentUser.isLogin = false;
    currentUser = null;
    await saveUsers();
  }
  startMenu();
}

function startMenu() {
  console.clear();
  if (currentUser) return mainMenu();
  console.log(chalk.yellow.bold("\n====================="));
  console.log(chalk.yellow.bold("||  Guessing Game  ||"));
  console.log(chalk.yellow.bold("====================="));
  console.log("1. Login");
  console.log("2. Register");
  console.log("3. Exit");

  question("Choose Options: ")
    .then((option) => {
      switch (option) {
        case "1":
          login();
          break;
        case "2":
          register();
          break;
        case "3":
          console.clear();
          console.log("Goodbye!");
          rl.close();
          break;
        default:
          console.log(chalk.red("Invalid option, please try again"));
      }
    })
    .catch((err) => console.log(err));
}

async function mainMenu() {
  console.log(
    `\nUser: ${currentUser.username} | Percobaan: ${currentUser.percobaan}`,
  );
  console.log(chalk.yellow.bold("\n====================="));
  console.log(chalk.yellow.bold("||     Main Menu   ||"));
  console.log(chalk.yellow.bold("====================="));
  console.log("1. Mulai Game");
  console.log("2. Lihat Papan Skor");
  console.log("3. Logout");

  question("Choose Option: ").then((option) => {
    switch (option) {
      case "1":
        playGame();
        break;
      case "2":
        showLeaderboard();
        break;
      case "3":
        logout();
        break;
      default:
        console.log(chalk.red("Invalid option, please try again"));
    }
  });
}

function showLeaderboard() {
  console.clear();
  console.log(chalk.yellow("\n--- Papan Skor ---"));
  if (users.length === 1 && users[0].percobaan !== null) {
    console.log(`1. ${users[0].username}: ${users[0].percobaan} percobaan`);
    return mainMenu();
  }

  const sorted = users
    .filter((u) => u.percobaan !== null)
    .sort((a, b) => a.percobaan - b.percobaan)
    .slice(0, 10);
  if (sorted.length < 1) {
    console.log("No Data");
  }

  sorted.forEach((user, idx) => {
    console.log(`${idx + 1}. ${user.username}: ${user.percobaan} percobaan`);
  });
  mainMenu();
}

async function playGame() {
  console.clear();
  console.log(chalk.cyan("Tebak Angka 1 - 100"));
  const target = randomInt(1, 101);
  let attempts = 0;
  let won = false;

  while (!won) {
    const answerStr = await question("Tebak Angka: ");
    const answer = parseInt(answerStr);

    if (isNaN(answer)) {
      console.log(chalk.red("Mohon masukkan angka yang valid."));
      continue;
    }

    attempts++;

    if (answer === target) {
      console.clear();
      console.log(chalk.green(`Selamat! Angka yang benar adalah ${target}.`));
      console.log(`Kamu menebak dalam ${attempts} kali percobaan.`);

      if (currentUser.percobaan === null || attempts < currentUser.percobaan) {
        console.log(chalk.yellow("Rekor Baru!"));
        currentUser.percobaan = attempts;
        await saveUsers();
      }

      won = true;
    } else {
      console.log(answer < target ? "Terlalu Rendah" : "Terlalu Tinggi");
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
