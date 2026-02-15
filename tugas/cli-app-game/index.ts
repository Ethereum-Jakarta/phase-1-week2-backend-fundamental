import readline from 'readline';
import fs from 'fs/promises';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (q: string): Promise<string> => new Promise(resolve => rl.question(q, answer => resolve(answer)));

interface User {
  name: string;
  password: string;
  highestScore: number | null;
}

let users: User[] = [];
let currentUser = null as User | null;

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

async function login(): Promise<void> {
  console.log(chalk.yellow("--- Login Menu ---"));
  while(true) {
    const username = await question(chalk.blue("username : "));
    const password = await question(chalk.blue("password : "));
    const selected = users.find(x => x.name === username && x.password === password);
    if (!selected) {
      console.log(chalk.red("username atau password salah"));
      console.log("ketik " + chalk.blue("b") + " untuk kembali");
      console.log("ketik " + chalk.blue("r") + " untuk memulai kembali");
      const choose = await question(chalk.blue("Pilih opsi: "));
      if (choose === "r") continue;
      else return startMenu();
    } else {
      currentUser = selected;
      return mainMenu();
    }
  }
}

async function register() {
  console.log(chalk.yellow("--- Register Menu ---"));
  const name = await question(chalk.blue("username : "));
  const password = await question(chalk.blue("password : "));
  users.push({ name, password, highestScore: null });
  await saveUsers();
  currentUser = users[users.length - 1];
  return mainMenu();
}

async function startMenu(): Promise<void> {
  console.log(chalk.yellow("--- Guessing Game ---"));
  console.log("1. Login\n2. Register\n3. Keluar");
  let choose = -1;
  while (choose === -1) {
    const answer = await question(chalk.blue("Pilih opsi: "));
    const num = +answer;
    if (isNaN(num)) console.log(chalk.red("Bukan nomor!"));
    else if (num < 1 || num > 3) console.log(chalk.red("Pilih antara 1, 2, 3"))
    else choose = num;
  }
  switch (choose) {
    case 1: return login();
    case 2: return register();
    case 3: return rl.close();
  }
}

// ... (kode lainnya tetap sama)

async function mainMenu(): Promise<void> {
  console.log(chalk.yellow("--- Main Menu ---"));
  console.log("1. Mulai Game\n2. Lihat Papan Skor\n3. Logout");
  let choose = -1;
  while (choose === -1) {
    const answer = await question(chalk.blue("Pilih opsi: "));
    const num = +answer;
    if (isNaN(num)) console.log(chalk.red("Bukan nomor!"));
    else if (num < 1 || num > 3) console.log(chalk.red("Pilih antara 1, 2, 3"))
    else choose = num;
  }
  switch (choose) {
    case 1: return playGame();
    case 2: return showLeaderboard();
    case 3: 
      currentUser = null;
      return startMenu();
  }
}

function showLeaderboard(): Promise<void> {
  const topten = users
    .filter(x => x.highestScore !== null)
    .sort((a, b) => a.highestScore! - b.highestScore!)
    .slice(0, 10);
  console.log(chalk.yellow("--- Papan Skor (Top 10) ---"));
  if (!topten.length) console.log(chalk.red("belum ada yang bermain!"));
  topten.forEach((x, i) => console.log(`${i+1}. ${x === currentUser ? chalk.green(x.name) : x.name}: ${x.highestScore} percobaan`));
  return mainMenu();
}

async function playGame() {
  console.log(chalk.yellow("--- Tebak Angka ---"));
  console.log("Tebak angka antara 1 dan 100");
  const secret = Math.round(Math.random() * 99) + 1;
  let tries = 0;
  while(true) {
    const answer = +(await question(chalk.blue("Tebakan anda: ")));
    if (isNaN(answer)) console.log(chalk.red("itu bukan lah angka"));
    else if (answer > secret) console.log(chalk.yellow("Terlalu tinggi!"));
    else if (answer < secret) console.log(chalk.yellow("Terlalu rendah!"));
    else break;
    tries++;
  }
  const curentScore = currentUser?.highestScore ?? Number.MAX_SAFE_INTEGER;
  console.log(chalk.green(`Selamat! Anda menebak dengan benar dalam ${tries} percobaan.`));
  if (curentScore > tries) {
    currentUser!.highestScore = tries;
    await saveUsers();
    console.log(chalk.green("Ini adalah skor tertinggi baru Anda!"));
  }
  return mainMenu();
}

// Fungsi utama untuk menjalankan aplikasi
async function main() {
  await loadUsers();
  startMenu();
}

main();
