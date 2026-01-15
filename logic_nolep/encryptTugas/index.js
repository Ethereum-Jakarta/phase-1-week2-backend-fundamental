import { encrypt, decrypt } from './cryptoApp.js';
import { scheduleTask } from './scheduleApp.js';
import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout    
});

function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

const key = 'mysceretkey';

async function encryptTxt() {
    console.log(chalk.yellow('\n--- Encrypted Text ---'));
    const askEncrypted = await question(chalk.blue('Text: '));
    const encryptedText = encrypt(askEncrypted, key);
    console.log('Encrypted Text:', encryptedText);
    return display();
}

async function decryptTxt() {
    console.log(chalk.yellow('\n--- Decrypted Text ---'));
    const askDecrypted = await question(chalk.blue('Text: '));
    const decryptedText = decrypt(askDecrypted, key);
    console.log('Decrypted Text:', decryptedText);
    return display();
}

async function schedule() {
    console.log(chalk.yellow('\n--- Schedule Task ---'));
    const task = await question(chalk.blue('Task: '));
    await scheduleTask(task)
    return display();
}

async function display() {
    console.log(chalk.yellow('\n--- Testing cryptoApp ---'));
    console.log('1. Encrypt Text');
    console.log('2. Decyrpt Text');
    console.log('3. Schedule Task');
    console.log('4. Exit');
    const choice = await question(chalk.blue('Pilih opsi: '));

    switch(choice) {
        case "1":
            await encryptTxt();
            break;
        case "2":
            await decryptTxt();
            break;
        case "3":
            await schedule();
            break;
        case "4":
            console.log(chalk.green('GoodBye!'));
            rl.close();
            break;
        default:
            console.log(chalk.red('Invalid choice!'));
    }
}

display();
