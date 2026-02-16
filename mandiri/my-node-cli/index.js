//inisialisasi module dan data file kita yang berbentuk users.json
import fs from 'fs/promises';
import readline from 'readline';
import readlineSync from 'readline-sync'
import chalk from 'chalk';

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

const dataFile = 'users.json';

//membuat fungsi loadUsers() untuk mengambil data user nantinya di file .json dan saveUser() untuk menyimpan
async function loadUsers() {
    try {
        const data = await fs.readFile(dataFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveUsers(users) {
    await fs.writeFile(dataFile, JSON.stringify(users, null, 2));
}

//fungsi untuk memberikan pertanyaan pada user
// function question(query) {
//     return new Promise((resolve, reject) => {
//         rl.question(query, resolve);
//     })
// }

function question(query, Hidden = false) {
    return readlineSync.question(query, { hideEchoBack: Hidden });
}

//fungsi ini untuk login dengan user yang sudah terdaftar pada file .json, jika user berhasil login maka akan menampilkan status online
async function login() {
    console.clear();
    console.log(chalk.blue.bold('====Login==='));
    const username = question(chalk.yellow('Username: '));
    const password = question(chalk.yellow('Password: '), true);

    const users = await loadUsers();
    const find = users.find(u => u.status === "online");
    if (find) return console.log(chalk.red('Someone has logged in!'));

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        user.status = 'online';
        user.lastLogin = new Date().toISOString();
        await saveUsers(users);
        console.log(chalk.green('Login successfull!'));
        console.log(chalk.cyan(`Welcome back, ${username}!`));
    } else {
        console.log(chalk.red('Invalid username or password.'));
    }
}


//fungsi register untuk mendaftarkn user kedalam data .json
async function register() {
    console.clear();
    console.log(chalk.blue.bold('===Register==='));
    const username = question(chalk.yellow('Choose a username: '));
    const password = question(chalk.yellow('Choose a password: '), true);

    const users = await loadUsers();
    if (users.some(u => u.username === username)) {
        console.log(chalk.red('Username already exists'));
    } else {
        users.push({
            username,
            password,
            status: "offline",
            lastLogin: null
        });
        await saveUsers(users);
        console.log(chalk.green('Registration successfull!'))
    }
}

//fungsi logout untuk memberikan status offline jika kita sedang login
async function logout() {
    console.clear();
    console.log(chalk.blue.bold('===Logout===='));
    const username = question(chalk.yellow('Enter your username: '));

    const users = await loadUsers();
    const user = users.find(u => u.username === username);

    if (user && user.status === "online") {
        user.status = "offline";
        await saveUsers(users);
        console.log(chalk.green(`${username} has been logged out`));
    } else {
        console.log(chalk.red('User not found or not logged in.'))
    }
}

//fungsi list user untuk menampilkan semua user dan beserta statusnya
async function listUsers() {
    console.clear();
    console.log(chalk.blue.bold('===User List==='));
    const users = await loadUsers();
    users.forEach(user => {
        const statusColor = user.status === 'online' ? chalk.green : chalk.red;
        console.log(chalk.cyan(`Username: ${user.username}`));
        console.log(statusColor(`Status: ${user.status}`));
        console.log(chalk.yellow(`Last Login: ${user.lastLogin}`));
        console.log("-".repeat(30));
    });
}

async function changePassword() {
    const username = question(chalk.yellow("Username: "));
    const newPassword = question(chalk.yellow("New Password: "));

    const users = await loadUsers();;
    const user = users.find(u => u.username === username);

    if (user.status === "online") {
        user.password = newPassword;
        await saveUsers(users);
        console.log(chalk.green('Change Password Successfull'))
    } else {
        console.log(chalk.red("Please login before"))
    }
}

//fungsi untuk menjalankan semua code diatas dan menampilkan cli
async function main() {
    while (true) {
        console.log('\n');
        console.log(chalk.blue.bold('===Main Menu==='));
        console.log(chalk.yellow("1. Login"));
        console.log(chalk.yellow("2. Register"));
        console.log(chalk.yellow("3. Logout"));
        console.log(chalk.yellow("4. List Users"));
        console.log(chalk.yellow("5. Change Password"));
        console.log(chalk.yellow("6. Exit"));
        const choice = question(chalk.magenta('Enter your choice (1-6): '));

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
                // rl.close();
                return;
            default:
                console.log(chalk.red('Invalid choice. Please try again.'));
        }
    }
}

main()