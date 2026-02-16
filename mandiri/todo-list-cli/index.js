import chalk from "chalk";
import readline from 'readline';
import fs from 'fs/promises'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise((resolve, rejcet) => {
        rl.question(query, resolve);
    })
}

let users = []
async function loadData() {
    try {
        const data = await fs.readFile('todo-users.json', 'utf8');
        users = JSON.parse(data);
        return users;
    } catch (err) {
        console.log('Tidak ada file todo-users.json. Akan dibuat file baru')
        return [];
    }
}

async function saveData(users) {
    await fs.writeFile('todo-users.json', JSON.stringify(users, null, 2));
}

async function add() {
    console.clear();
    console.log(chalk.blue.bold("===Add Todo List==="));
    const todo = await question(chalk.yellow("Write Todo: "));

    users = await loadData();

    if (users.some(u => u.todo.toLowerCase() === todo.toLowerCase())) {
        console.log(chalk.red("Todo already exists!"))
    } else {
        users.push({
            todo,
            status: "belum selesai"
        });

        await saveData(users);
        console.log(chalk.green("Add todo successfull!"))
    }
}

async function show() {
    console.clear()
    const users = await loadData()
    console.log(chalk.blue.bold("=== Todo List ==="))
    for (let i = 0; i < users.length; i++) {
        console.log(`${i + 1}. Tugas: ${chalk.magenta(users[i].todo)}, Status: ${users[i].status === "selesai" ? chalk.green(users[i].status) : chalk.yellow(users[i].status)} `)
    }
}

async function del() {
    console.clear();
    console.log(chalk.blue.bold("=== Delete Todo === "));
    const todo = await question(chalk.yellow("Todo: "));

    users = await loadData();

    let found = users.find(u => u.todo.toLowerCase() === todo.toLowerCase());
    if (!found) {
        console.log(chalk.red("data todo tidak ditemukan..."));
        return
    }
    let del = users.filter(u => u.todo.toLowerCase() !== todo.toLowerCase());
    // console.log(del)
    saveData(del);
    console.log(chalk.green("todo berhasil di hapus..."))
}

async function check() {
    console.clear()
    console.log(chalk.blue.bold("=== Check Todo ==="));
    const todo = await question(chalk.yellow("Todo: "));
    const status = await question(chalk.yellow("Change status: "));

    users = await loadData();

    let found = users.find(u => u.todo.toLowerCase() === todo.toLowerCase());
    // console.log(found)

    if (!found) {
        console.log(chalk.red("data todo tidak ditemukan..."));
        return
    }
    found.status = status;
    saveData(users)
    console.log(chalk.green("status berhasil di ubah..."))
}

async function start() {
    while (true) {
        console.log("\n");
        console.log(chalk.blue.bold("=== Todo List - CLI"));
        console.log("1. Menambah");
        console.log("2. Menampilkan");
        console.log("3. Menghapus");
        console.log("4. Tandai Tugas");
        console.log("5. Keluar");
        const choice = await question(chalk.magenta("Enter your choice (1-4): "));

        switch (choice) {
            case "1":
                await add();
                break;
            case "2":
                await show();
                break;
            case "3":
                await del();
                break;
            case "4":
                await check();
                break;
            case "5":
                console.log(chalk.green("Selamat tinggal"))
                rl.close();
                return;
            default:
                console.log(chalk.red("Invalid choice. Please try again!"))
        }
    }
}

async function main() {
    await loadData();
    start();
}

main()