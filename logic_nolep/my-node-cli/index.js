import fs from 'fs/promises';
import readline from 'readline';
import chalk from 'chalk';
import inquirer from 'inquirer';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dataFile = 'users.json';

async function loadUsers() {
    try {
        const data = await fs.readFile(dataFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveUsers(users) {
    await fs.writeFile(dataFile, JSON.stringify(users, null, 2));
}

function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function login() {
    console.clear();
    console.log(chalk.blue.bold('=== Login ==='));
    const username = await question(chalk.yellow('Username: '));
    const password = await questionHidden(chalk.yellow('Password: '));

    const users = await loadUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        user.status = 'online';
        user.lastLogin = new Date().toISOString();
        await saveUsers(users);
        console.log(chalk.green('Login successful!'));
        console.log(chalk.cyan(`Welcome back, ${username}!`));
    } else {
        console.log(chalk.red('Invalid username or password'));
    }
}

async function register() {
    console.clear();
    console.log(chalk.blue.bold('=== Register ==='));
    const username = await question(chalk.yellow('Choose a username: '));
    const password = await questionHidden(chalk.yellow('Choose a password: '));

    const users = await loadUsers();
    if (users.some(u => u.username === username)) {
        console.log(chalk.red('Username already exists.'));
    } else {
        users.push({
            username,
            password,
            status: 'offline',
            lastLogin: null
        });
        await saveUsers(users);
        console.log(chalk.green('Registration successful!'));
    }
}

async function logout() {
    console.clear();
    console.log(chalk.blue.bold('=== Logout ==='));
    const username = await question(chalk.yellow('Enter your username: '));

    const users = await loadUsers();
    const user = users.find(u => u.username === username);

    if (user && user.status === 'online') {
        user.status = 'offline';
        await saveUsers(users);
        console.log(chalk.green(`${username} has been logged out`));
    } else {
        console.log(chalk.red('User not found or not logged in'));
    }
}

// fitur tambahan: masking password 
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

// fitur tambahan: ganti password
async function changePassword() {
    console.clear();
    console.log(chalk.blue.bold('=== Change Password ==='));

    const users = await loadUsers();
    const user = users.find(u => u.status === 'online');
    if (!user) {
        console.log(chalk.red('You must login first.'));
        return;
    }

    const oldPassword = await questionHidden(chalk.yellow('Current Password: '));

    if (user.password !== oldPassword) {
        console.log(chalk.red('Wrong old password!'));
        return;
    }

    const newPassword = await questionHidden(chalk.yellow('New Password: '));

    user.password = newPassword;
    await saveUsers(users);
    console.log(chalk.green('Password changed successfuly'));
}


async function listUsers() {
    console.clear();
    console.log(chalk.blue.bold('=== User List ==='));
    const users = await loadUsers();
    users.forEach(user => {
        const statusColor = user.status === 'online' ? chalk.green : chalk.red;
        console.log(chalk.cyan(`Username: ${user.username}`));
        console.log(statusColor(`Status: ${user.status}`));
        console.log(chalk.yellow(`Last login: ${user.lastLogin || 'Never'}`));
        console.log('-'.repeat(30));
    });
}

async function main() {
    while (true) {
        console.log('\n');
        console.log(chalk.blue.bold('=== Main Menu ==='));
        console.log(chalk.yellow('1. Login'));
        console.log(chalk.yellow('2. Register'));
        console.log(chalk.yellow('3. Logout'));
        console.log(chalk.yellow('4. List Users'));
        console.log(chalk.yellow('5. Change Password'));
        console.log(chalk.yellow('6. Exit'));
        const choice = await question(chalk.magenta('Enter your choice (1-6): '));

        switch (choice) {
            case '1':
                await login();
                break;
            case '2': 
                await register();
                break;
            case '3':
                await logout();
                break;
            case '4':
                await listUsers();
                break;
            case '5':
                await changePassword();
                break;    
            case '6':
                console.log(chalk.green('Goodbye!'));
                rl.close();
                return;
            default:
                console.log(chalk.red('Invalid choice. Please try again.'));            
        }
    }
}

main();