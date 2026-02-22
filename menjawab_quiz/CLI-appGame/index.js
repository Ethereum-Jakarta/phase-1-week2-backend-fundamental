import readline from 'readline';
import fs from 'fs/promises';
import chalk, { Chalk } from 'chalk';
import { mergeSort } from './sorting.js';

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

function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function login() {
    console.clear()
    console.log("Kamu sedang login..")

    const username = await question(chalk.yellow('Enter your username: '));
    const password = await question(chalk.yellow('Enter your password: '));

    let user = users.find(u => u.username === username && u.password === password);

    if(user) {
        user.status = 'online';
        user.lastLogin = new Date().toISOString();
        await saveUsers(users);
        currentUser = user;

        console.log(chalk.green('Login successful!'));
        console.log(chalk.cyan(`Welcome back, ${username}!`));

        mainMenu();
    } else {
        console.log(chalk.red('Invalid username or password.'));
        startMenu();
    }
}

async function logout() {
    currentUser.status = "offline";
    await saveUsers();
    currentUser = null;

    console.clear();
    console.log(chalk.green.bold(`Logout successful!`));
    console.log(chalk.cyan(`See ya!`));

    startMenu();
}

async function register() {
    console.clear()
    console.log("Kamu melakukan register..")

    const username = await question(chalk.yellow('Choose a username: '));
    const password = await question(chalk.yellow('Choose a password: '));

    if(users.some(u => u.username === username)) {
        console.log(chalk.red('Username already exists.'));
    } else {
        users.push(
            {
                username,
                password,
                status: "offline",
                bestScore: 9999999999,
                lastLogin: null
            }
        )
        await saveUsers();
        console.log(chalk.green('Registration successful!'));
    }

}

async function startMenu() {
        while(true) {
            console.log('\n');
            console.log(chalk.blue.bold('=== Guessing Game ==='));
            console.log(chalk.yellow('1. Login'));
            console.log(chalk.yellow('2. Register'));
            console.log(chalk.yellow('3. Out'));
            const choice = await question(chalk.magenta('Enter your choice (1-3): '));
    
            switch (choice) {
                case "1":
                    await login()
                    return;
            
                case "2":
                    await register()
                    break;
                
                case "3":
                    console.log(chalk.green('Thanks for playing!'));
                    rl.close();
                    return;
    
                default:
                    break;
            }
        }
}

// ... (kode lainnya tetap sama)

async function mainMenu() {
    while(true) {
        console.log("\n");
        console.log(chalk.cyan.bold(`Hi ${currentUser.username}!`));

        if(currentUser.bestScore === 9999999999) {
            console.log(chalk.cyan.bold(`Best Score: -`));
        } else {
            console.log(chalk.cyan.bold(`Best Score: ${currentUser.bestScore}x`));
        }

        console.log(chalk.blue.bold('=== Main Menu ==='));
        console.log(chalk.yellow('1. Start Game'));
        console.log(chalk.yellow('2. Show Leaderboard'));
        console.log(chalk.yellow('3. Logout'));
        
        const choice = await question(chalk.magenta('Enter your choice (1-3): '));

        switch (choice) {
            case "1":
                await playGame()
                return;
        
            case "2":
                await showLeaderboard()
                return;
            
            case "3":
                await logout();
                return;

            default:
                break;
        }
    }
}

async function showLeaderboard() {
    const sortPlayer = await mergeSort(users);
    let topPlayer = [];

    for(let i = 0; i < 10; i++) {
        if(sortPlayer[i] == undefined) {
            break;
        }
        topPlayer.push(
            {
                rank: i + 1,
                username: sortPlayer[i].username,
                score: sortPlayer[i].bestScore
            }
        ) 
    }

    console.clear();
    console.log(chalk.yellow("=== TOP 10 ==="));
    console.table(topPlayer);

    const rank = sortPlayer.findIndex(u => u.username === currentUser.username) + 1;
    console.log(chalk.blue(`Your rank: ${chalk.yellow(rank)}`));

    console.log(chalk.blue("Wanna play again?"))
    const command = await question(chalk.magenta.bold("<Y/N>"));

    switch (command) {
        case "Y":
            await playGame();
            return;
        
        case "N":
            await mainMenu();
            return;
    
        default:
            console.log(chalk.red("Invalid Command.."))
            await mainMenu();
            return;
    }
}          
               
async function makeGuess(num, count = 0) {  
    const guess = await question(chalk.blue("Yours: "));

    count++;
    if(guess == num) {
        console.clear();
        console.log(chalk.green(`Yooo! Correct! You've tried ${count}x`));
        if(count < currentUser.bestScore){
            currentUser.bestScore = count;
            console.log(chalk.green(`New HighScore!!`));
        }
        await saveUsers()
        return mainMenu()
    } else {
        if(guess > num) {
            console.log(chalk.yellow("TOO HIGH!"));
            makeGuess(num, count);
        } else {
            console.log(chalk.yellow("TOO LOW!"));
            makeGuess(num, count);
        }
    }
}

async function playGame() {
    console.clear();
    console.log(chalk.blue.bold('=== Tebak Angka ==='));
    console.log("");
    console.log("Guess a number between 1 - 100");
    
    const num = Math.floor(Math.random() * 100) + 1;

    await makeGuess(num);
}

// Fungsi utama untuk menjalankan aplikasi
async function main() {
  await loadUsers();
  startMenu();
}

main();