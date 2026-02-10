var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { encrypt, decrypt } from "./cryptoApp.js";
import scheduleTask from "./scheduleApp.js";
import readline from 'readline';
import chalk from 'chalk';
const key = 'secretKey123';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}
function encrypted() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.yellow('\n--- Encrypt Text ---'));
        const plainText = yield question(chalk.blue('Plain Text: '));
        const encryptedText = encrypt(plainText, key);
        const result = `Encrypted Text: ${encryptedText}`;
        console.log(result);
        return result;
    });
}
function decrypted() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.yellow('\n--- Decrypt Text ---'));
        const cipherText = yield question(chalk.blue('Cipher Text: '));
        const decryptedText = decrypt(cipherText, key);
        const result = `Decrypted Text: ${decryptedText}`;
        console.log(result);
        return result;
    });
}
function schedule() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.yellow('\n--- Schedule Task ---'));
        const task = yield question(chalk.blue('Task: '));
        const result = scheduleTask(task);
        console.log(result);
        return result;
    });
}
function display() {
    return __awaiter(this, void 0, void 0, function* () {
        let running = true;
        while (running) {
            console.log(chalk.yellow('\n--- Menu ---'));
            console.log(chalk.yellow('1. Encrypted Text'));
            console.log(chalk.yellow('2. Decrypted Text'));
            console.log(chalk.yellow('3. Schedule Task'));
            console.log(chalk.yellow('4. Exit'));
            const choice = yield question(chalk.blue('Choose number (1-4): '));
            switch (choice) {
                case '1':
                    yield encrypted();
                    break;
                case '2':
                    yield decrypted();
                    break;
                case '3':
                    yield schedule();
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
        return running;
    });
}
display();
//# sourceMappingURL=index.js.map