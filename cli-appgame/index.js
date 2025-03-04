import readline from "readline";
import fs from "fs/promises";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let users = [];
let currentUser = null;

async function loadUsers() {
  fs.readFile("users.json", "utf8")
    .then((data) => {
      users = JSON.parse(data);
    })
    .catch(() => {
      console.log("There's no users.json file. Make it first dong.");
    });
}

async function saveUsers() {
  await fs.writeFile("users.json", JSON.stringify(users, null, 2));
}

function askTanya(teksTanya) {
  return new Promise((callback) => rl.question(teksTanya, callback));
}

async function login() {
       console.log(chalk.blue('\n=== LOGIN ==='));
  const username = await askTanya(chalk.cyan('Masukkan username: '));
  const password = await askTanya(chalk.cyan('Masukkan password: '));

      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        currentUser = user;
        console.log(chalk.green(`Login berhasil! Selamat datang, ${username}`));
        mainMenu();
      } else {
        console.log(chalk.red("Username atau password salah."));
        startMenu();
      }
    
}

async function register() {
      console.log(chalk.blue('\n=== REGISTER ==='));
      const username = await askTanya(chalk.cyan('Masukkan username baru: '));

      if (users.find((u) => u.username === username)) {
        console.log(chalk.red("Username sudah terdaftar."));
        startMenu();
      } 

        const password = await askTanya(chalk.cyan("Masukkan password: "));
        const newUser = { username, password, highestScore: 0 };
        users.push(newUser);
        console.log(chalk.green("Registrasi berhasil!"));
        saveUsers();
        currentUser = newUser;
        mainMenu();
}

function startMenu() {
  console.log(chalk.blue("\nPilih opsi:"));
  console.log("1. Login");
  console.log("2. Register");
  console.log("3. Exit");

   askTanya(chalk.cyan("Pilih menu: ")).then((pilih) => {
     switch (pilih) {
       case "1":
         login();
         break;
       case "2":
         register();
         break;
       case "3":
         console.log(chalk.green("Terima kasih! Keluar dari aplikasi."));
         rl.close();
         break;
       default:
         console.log(chalk.red("Pilihan tidak valid."));
         startMenu();
     }
   });
}

function mainMenu() {
  console.log(chalk.blue("\nMain Menu:"));
  console.log("1. Mulai Game");
  console.log("2. Lihat Papan Skor");
  console.log("3. Logout");

   askTanya(chalk.cyan("Pilih menu: ")).then((pilih) => {
     switch (pilih) {
       case "1":
         playGame();
         break;
       case "2":
         showLeaderboard();
         break;
       case "3":
         currentUser = null;
         startMenu();
         break;
       default:
         console.log(chalk.red("Pilihan tidak valid."));
         mainMenu();
     }
   });
}

function showLeaderboard() {
  console.log(chalk.yellow("\nPapan Skor Top 10:"));
  const sortedUsers = users
    .sort((a, b) => b.highestScore - a.highestScore)
    .slice(0, 10);
  sortedUsers.forEach((user, index) => {
    console.log(`${index + 1}. ${user.username} - Score: ${user.highestScore}`);
  });
  mainMenu();
}

async function playGame() {
  console.log(chalk.green("\nMulai permainan! Tebak angka antara 1 dan 100."));
  const target = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  
  async function makeGuess() {
      rl.question(chalk.cyan("Masukkan tebakan: "), async (input) => {
      const guess = parseInt(input);

      if (isNaN(guess)) {
        console.log(chalk.red("Masukkan angka yang valid."));
        makeGuess();
      } else {
        attempts++;
        if (guess < target) {
          console.log(chalk.yellow("Terlalu rendah!"));
          makeGuess();
        } else if (guess > target) {
          console.log(chalk.yellow("Terlalu tinggi!"));
          makeGuess();
        } else {
          console.log(
            chalk.green(
              `Selamat! Anda menebak angka dengan benar! Tebakan: ${attempts} kali.`
            )
          );


          if (
            attempts < currentUser.highestScore ||
            currentUser.highestScore === 0
          ) {
            currentUser.highestScore = attempts;
            await saveUsers();
            console.log(
              chalk.green(
                `Score terbaik Anda disimpan: ${currentUser.highestScore}`
              )
            );
          }
          mainMenu();
        }
      }
    });
  }

  makeGuess();
}

// Fungsi utama untuk menjalankan aplikasi
async function main() {
  await loadUsers();
  startMenu();
}

main();


