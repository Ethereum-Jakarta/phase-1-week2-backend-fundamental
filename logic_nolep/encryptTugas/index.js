import { encrypt, decrypt } from './cryptoApp.js';
import { scheduleTask } from './scheduleApp.js';

import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise ((resolve) => rl.question(query, resolve));
}

async function encrypted() {
    console.log(chalk.blue.bold('\n=== Encrypted Text ==='));
    const text = await question(chalk.yellow('Text: '));
    const secretKey = await question(chalk.yellow('Secret Key: '));
    const encryptedText = encrypt(text, secretKey);
    console.log(`Encrypted Text: ${encryptedText}`);  
    await main();
} 

async function decrypted() {
    console.log(chalk.blue.bold('\n=== Decrypted Text ==='));
    const encryptText = await question(chalk.yellow('Encrypt Text: '));
    const secretKey = await question(chalk.yellow('Secret Key: '));
    const decryptedText = decrypt(encryptText, secretKey);
    console.log(`Decrypted Text: ${decryptedText}`);
    await main();
}

async function task() {
    console.log(chalk.blue.bold('\n=== Schedule Task ==='));
    const task = await question(chalk.yellow('Your Task: '));
    const time = await question(chalk.yellow('How many time do you need?: '));
    const schedule = await scheduleTask(task, time);
    await main();
    return schedule
}

async function main() {
    console.log(chalk.blue.bold('\n=== Main Menu ==='));
    console.log(chalk.yellow('1. Encrypt Text'));
    console.log(chalk.yellow('2. Decrypt Text'));
    console.log(chalk.yellow('3. Schedule Task'));
    console.log(chalk.yellow('4. Exit'));
    const choice = await question(chalk.magenta('Enter your choice (1-4): '));

    switch(choice) {
        case '1':
            await encrypted();
            break;
        case '2':
            await decrypted();
            break;
        case '3':
            await task();
            break;
        case '4':
            console.log(chalk.green('Goodbye!'));
            rl.close();
            return;
        default:
            console.log(chalk.red('Invalid choice'));
    }
}

main();