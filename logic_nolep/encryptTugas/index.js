import { encrypt, decrypt } from './cryptoApp.js';
import { scheduleTask } from './scheduleApp.js';

import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function encrypted() {
    console.log(chalk.blue.bold('\n--- Encrypted Text ---'));
    const text = await question(chalk.yellow('Enter text: '));
    const key = await question(chalk.yellow('Enter key: '));

    const encryptedText = encrypt(text, key);
    console.log('Encrypted Text:', encryptedText);
    await startMenu();
}

async function decrypted() {
    console.log(chalk.blue.bold('\n--- Decrypted Text ---'));
    const text = await question(chalk.yellow('Enter encrypted text: '));
    const key = await question(chalk.yellow('Enter key: '));

    try {
        const decryptedText = decrypt(text, key);
        console.log('Decrypted Text:', decryptedText);
    } catch {
        console.log(chalk.red('Failed to decrypt. Wrong key or invalid ciphertext.'));
    }

    await startMenu()
}

async function schedule() {
    console.log(chalk.blue.bold('--- Schedule Task ---'));
    const task = await question(chalk.yellow('Task: '));
    const doin = scheduleTask(task);
    console.log(doin)

}

async function startMenu() {
    console.log(chalk.blue.bold('\n--- Menu ---'));
    console.log('1. Encrypted Text');
    console.log('2. Decrypted Text');
    console.log('3. Schedule Task');
    console.log('4. Exit');
    const choice = await question(chalk.magenta('Choose the Option: '));

    switch (choice) {
        case '1':
            await encrypted();
            break;
        case '2':
            await decrypted();
            break;
        case '3':
            await schedule();
            await startMenu();
            break;
        case '4':
            console.log('Goodbye!');
            rl.close();
            return;
        default:
            console.log(chalk.red('Invalid option.'));
            await startMenu();
    }    
}

startMenu()