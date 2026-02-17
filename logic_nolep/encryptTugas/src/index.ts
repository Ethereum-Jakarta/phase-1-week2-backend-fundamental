import { encrypt, decrypt } from "./cryptoApp.js";
import scheduleTask from "./scheduleApp.js";
import readline from 'readline';
import chalk from 'chalk';

const key: string = 'secretKey123'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query: string): Promise<string> {
    return new Promise<string>((resolve) => rl.question(query, resolve));
}

async function encrypted(): Promise<string> {
    console.log(chalk.yellow('\n--- Encrypt Text ---'));
    const plainText: string = await question(chalk.blue('Plain Text: '));
    const encryptedText = encrypt(plainText, key)
    const result: string = `Encrypted Text: ${encryptedText}`
    console.log(result);
    return result
}

async function decrypted(): Promise<string> {
    console.log(chalk.yellow('\n--- Decrypt Text ---'));
    const cipherText = await question(chalk.blue('Cipher Text: '));
    const decryptedText = decrypt(cipherText, key);
    const result: string = `Decrypted Text: ${decryptedText}`;
    console.log(result);
    return result;
}

async function schedule(): Promise<string> {
    console.log(chalk.yellow('\n--- Schedule Task ---'));
    const task: string = await question(chalk.blue('Task: '));
    const result: string = scheduleTask(task);
    console.log(result);
    return result;
}

async function display(): Promise<boolean> {
    let running: boolean = true;
    while (running) {
        console.log(chalk.yellow('\n--- Menu ---'));
        console.log(chalk.yellow('1. Encrypted Text'));
        console.log(chalk.yellow('2. Decrypted Text'));
        console.log(chalk.yellow('3. Schedule Task'));
        console.log(chalk.yellow('4. Exit'));
        const choice: string = await question(chalk.blue('Choose number (1-4): '))

        switch(choice) {
            case '1':
                await encrypted();
                break;
            case '2':
                await decrypted();
                break;
            case '3':
                await schedule();
                break;
            case '4':
                running = false;
                rl.close();
                console.log(chalk.green('GoodBye!'));
                break;
            default:
                console.log(chalk.red('Invalid number!'));
        }
    }
    return running
}

display();