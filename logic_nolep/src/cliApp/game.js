import * as readline from "node:readline/promises";
import * as fs from "node:fs/promises";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import chalk, { Chalk } from "chalk";

const __DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__DIRNAME, "model", "users.json");
const SESSION_PATH = path.join(__DIRNAME, "model", "session.json");

const rl = readline.createInterface({
  input,
  output,
});

async function loadUsers() {
  try {
    const data = await fs.readFile(DB_PATH, "utf8");
    const users = JSON.parse(data);
    return users;
  } catch (err) {
    if (err.code === "ENOENT" || err.name === "SyntaxError") {
      await fs.writeFile(DB_PATH, JSON.stringify([], null, 2));
      return [];
    } else {
      throw new Error(`${err.name}: ${err.message}`);
    }
  }
}

async function saveUsersData(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  return;
}

async function readSession() {
  try {
    const session = await fs.access(SESSION_PATH);
    if (!session) {
      throw new Error("TIDAK BOLEH LOGIN BERSAMAAN");
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      return;
    } else {
      throw new Error(`${err.name}: ${err.message}`);
    }
  }
}

async function saveSession(data) {
  try {
    await fs.writeFile(SESSION_PATH, JSON.stringify(data, null, 2));
    return;
  } catch (err) {
    throw new Error(`${err.name}: ${err.message}`);
  }
}

async function newHighScore(highScore, player) {
  const users = await loadUsers();

  const updateUsersHighScore = users.map((user) => {
    if (user.username === player) {
      return {
        ...user,
        score: user.score < highScore ? highScore : user.score,
      };
    } else {
      return user;
    }
  });

  console.log(updateUsersHighScore);

  await saveUsersData(updateUsersHighScore);
  return;
}

async function showLeaderboard() {
  // tulis code di sini
  const users = await loadUsers();
  const rawLeaderboard = users
    .map((user) => ({
      username: user.username,
      score: user.score,
    }))
    .filter((user) => user.score > 0)
    .sort((a, b) => a.score - b.score);

  console.log(chalk.magenta("=== TOP 10 LEADERBOARD ==="));
  rawLeaderboard.forEach((player, index) => {
    console.log(
      chalk.white(
        `${index + 1}. ${player.username} : ${player.score} percobaan`
      )
    );
  });
}

async function playGame() {
  // tulis code di sini
  const computer = Math.round(Math.random() * 100);
  let isCorrect = false;
  let score = 1;
  console.log(chalk.yellow("--- TEBAK ANGKA ---"));
  console.log(chalk.cyan("Tebak angka dari 1 - 100"));

  while (!isCorrect) {
    const rawGuest = await rl.question("Tebakan anda: ");
    const guess = Number(rawGuest);

    if (guess > computer) {
      console.log(chalk.yellow("TEBAKAN ANDA TERLALU TINGGI"));
    } else if (guess < computer) {
      console.log(chalk.yellow("TEBAKAN ANDA TERLALU RENDAH"));
    } else if ((guess < 1 && guess > 100) || typeof guess !== "number") {
      console.log(chalk.yellow("LU GOBLOG ANYING BACA : PILIH 1 - 100"));
    } else if (guess === computer) {
      console.log(
        chalk.green(
          `YEAY KAMU BERHASIL MENEBAK DENGAN BENAR DALAM ${score} PERCOBAAN!`
        )
      );
      isCorrect = true;
    } else {
      console.log(chalk.yellow("JANGAN NGAWUR ANYING"));
    }

    score++;
  }

  return score;
}

async function logout() {
  // tulis code di sini
  await fs.unlink(SESSION_PATH);
  console.log(chalk.green("BERHASIL LOGOUT"));
}

async function login() {
  // tulis code di sini
  await readSession();

  console.log("");
  const username = await rl.question(chalk.blue("MASUKAN USERNAME: "));
  const pasword = await rl.question(chalk.blue("MASUKAN PASSWORD: "));

  const users = await loadUsers();

  const user = users.find(
    (e) => e.username === username && e.pasword === pasword
  );

  if (user) {
    await saveSession({ username, pasword, date: new Date() });

    console.log("");
    console.log(chalk.yellow("--- BERHASIL LOGIN ---"));
    console.log(chalk.cyan(`username : ${username}`));
    console.log(chalk.cyan(`pasword : ${pasword}`));
    console.log("");
    return username;
  } else {
    throw new Error("USERNAME DAN PASSWOD TIDAK VALID");
  }
}

async function register() {
  // tulis code di sini
  console.log("");
  const username = await rl.question(chalk.blue("BUAT USERNAME: "));
  const pasword = await rl.question(chalk.blue("BUAT PASSWORD: "));

  //CHECK ANTI UNDEFINED OR NULL
  if (!username && !pasword) {
    throw new Error("USERNAME DAN PASSWORD TIDAK BOLEH KOSONG!");
  }

  const users = await loadUsers();

  //CHECK ANTI DUPLIKASI
  if (users.some((e) => e.username === username && e.pasword === pasword)) {
    throw new Error("USERNAME DAN PASSWORD SUDAH ADA, PAKAI YANG LAIN!");
  }

  const nextId = users.length > 0 ? Math.max(...users.map((e) => e.id)) + 1 : 1;

  const newUser = {
    id: nextId,
    username,
    pasword,
    score: 0,
  };

  users.push(newUser);

  await saveUsersData(users);

  console.log("");
  console.log(chalk.yellow("--- BERHASIL MENDAFTAR ---"));
  console.log(chalk.cyan(`username : ${username}`));
  console.log(chalk.cyan(`pasword : ${pasword}`));
  console.log(chalk.yellow("--- LANJUTKAN LOGIN ---"));
  console.log("");
  return;
}

async function mainMenu(player) {
  // tulis code di sini
  let isLogin = true;
  while (isLogin) {
    console.log(chalk.yellow("--- MAIN MENU ---"));
    console.log(chalk.white("1. Mulai Game"));
    console.log(chalk.white("2. Lihat Papan Score"));
    console.log(chalk.white("3. Logout"));
    const answer = await rl.question(chalk.cyan("Pilih Opsi:"));

    switch (answer) {
      case "1":
        const highScore = await playGame();
        await newHighScore(highScore, player);
        break;
      case "2":
        await showLeaderboard();
        break;
      case "3":
        await logout();
        isLogin = false;
        break;
      default:
        console.log(chalk.red("PILIH DENGAN BENAR YA!"));
        break;
    }
  }
  return;
}

async function startMenu() {
  console.log(chalk.yellow("--- GUESSING GAME ---"));
  console.log(chalk.white("1. Login"));
  console.log(chalk.white("2. Register"));
  console.log(chalk.white("3. Keluar"));
  const answer = await rl.question(chalk.cyan("Pilih Opsi:"));

  switch (answer) {
    case "1":
      try {
        const player = await login();
        await mainMenu(player);
        await startMenu();
      } catch (err) {
        console.log(chalk.red(err.message));
        await startMenu();
      }
      break;
    case "2":
      try {
        await register();
      } catch (err) {
        console.log(chalk.red(err.message));
      }
      await startMenu();
      break;
    case "3":
      console.log("");
      console.log(chalk.green("=== GOOD BYE! ==="));
      console.log("");
      break;
    default:
      console.log(chalk.red("PILIH DENGAN BENAR YA!"));
      await startMenu();
      break;
  }

  return;
}

async function main() {
  await startMenu();
  rl.close();
}

main();
