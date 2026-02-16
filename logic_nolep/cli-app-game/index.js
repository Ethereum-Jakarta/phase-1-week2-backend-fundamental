import readline from 'readline';
import fs from 'fs/promises';
import chalk from 'chalk';
import inquirer from 'inquirer';

// first setup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const data_file = 'users.json'

let users = [];
let currentUser = null;

// baca data pengguna dari file JSON
// layer data
async function loadUsers() {
    try {
        const data = await fs.readFile('users.json', 'utf-8');
        users = JSON.parse(data);
    } catch (error) {
        console.log(chalk.red('Tidak ada data file users.json. Akan dibuat file baru'));
        return users;
    }
}

async function saveUsers() {
    await fs.writeFile('users.json',JSON.stringify(users, null, 2));
}

// auth feature
async function login() {
    console.clear();
    console.log(chalk.blue.bold('--- LOGIN ---'));
    
    const username = await question(chalk.yellow('Username: '));
    const password = await questionHidden(chalk.yellow('Password: '));

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        console.log(chalk.red('Invalid username or password.'));
        return startMenu();
    }

    currentUser = user;
    console.log(chalk.green(`Welcome, ${user.username}`));
    await mainMenu();
}

async function register() {
    console.clear();
    console.log(chalk.blue.bold('--- Register ---'));

    const username = await question(chalk.yellow('Username: '));
    const password = await questionHidden(chalk.yellow('Password: '));

    if (users.some(u => u.username === username)) {
        console.log(chalk.red('Username already exists.'));
        return startMenu();
    }

    users.push({
        username,
        password,
        highestScore: null
    });

    await saveUsers();
    console.log(chalk.green('Registration succesful'));
    startMenu();
}

function logout() {
    currentUser = null;
    console.log(chalk.green('Logged out succesful'));
    startMenu();
}

// start menu
function startMenu() {
    console.log('\n');
    console.log(chalk.blue.bold('--- Start Menu ---'));
    console.log(chalk.yellow('1. Login'));
    console.log(chalk.yellow('2. Register'));
    console.log(chalk.yellow('3. Exit'));

    question(chalk.yellow(chalk.magenta('Choose from 1-3: '))).then(choice => {
        switch (choice) {
            case '1':
                login();
                break;
            case '2':
                register();
                break;
            case '3':
                rl.close();
                console.log(chalk.green('Goodbye!'));
                break;
            default:
                console.log(chalk.red('Invalid Choice'));
                startMenu();            
        }   
    });
}

// (kode lainnya tetap sama)
// I/O helper
function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function questionHidden(message) {
    rl.pause();

    const { password } = await inquirer.prompt([{
        type: 'password',
        name: 'password',
        message,
        mask: '*'
    }]);

    rl.resume();
    return password;
}

// game menu
async function mainMenu() {
    console.log('\n');
    console.log(chalk.blue.bold('--- Main Menu ---'));
    console.log(chalk.yellow('1. Start Game'));
    console.log(chalk.yellow('2. Leaderboard'));
    console.log(chalk.yellow('3. Logout'));

    const choice = await question(chalk.magenta('Choose from 1-3: '));
    switch (choice) {
        case '1':
            await playGame();
            break;
        case '2':
            showLeaderboard();
            break;          
        case '3':
            logout();
            break;
        default:
            console.log(chalk.red('Invalid choice.'));
            await mainMenu();              
    }
}

function showLeaderboard() {
    console.clear();
    console.log(chalk.blue.bold('--- TOP 10 SCORE ---'));

    const sorted = [...users]
    .filter(u => u.highestScore !== null)
    .sort((a, b) => a.highestScore - b.highestScore)
    .slice(0, 10);

    if (sorted.length === 0) {
        console.log(chalk.gray('No score yet.'));
    }

    sorted.forEach((u, i) => {
        console.log(`${i + 1}. ${u.username} - ${u.highestScore}`);
    });

    mainMenu();
}

function updateScore(attempts) {
    // logikanya paling kecil precobaan, maka paling tinggi skornya
    if (currentUser.highestScore === null || attempts < currentUser.highestScore) {
        currentUser.highestScore = attempts;
    }
}

async function playGame() {
    console.clear();
    console.log(chalk.green.bold('--- Guessing Game ---'));

    const target = Math.floor(Math.random() * 100) + 1;
    let attempt = 0;

    while (true) {
        const guess = await question('Guess number (1-100): ');
        const num = Number(guess);

        // preventing non number as an input atau edge case NaN input
        if (Number.isNaN(num)) {
            console.log(chalk.red('Input must be a number!'));
            continue;
        } 

        attempt++;

        if (num < target) {
            console.log(chalk.yellow('Too low'));
        } else if (num > target) {
            console.log(chalk.yellow('Too High'));
        } else {
            console.log(chalk.green(`Correct! You guessed in ${attempt} attempts.`));
            updateScore(attempt);
            await saveUsers();
            return mainMenu();
        }
    }
}

async function main() {
    await loadUsers();
    startMenu();
}

main();