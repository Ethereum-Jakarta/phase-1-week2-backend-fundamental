import inquirer from 'inquirer'
import chalk from 'chalk';
import figlet from 'figlet';
import { encrypt, decrypt } from './cryptoApp.js';

figlet('Crypto CLI', (err, data) => {
    console.log(chalk.bgBlue.white.bold(data));
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Apa yang ingin kamu lakukan',
            choices: ['🔐 Enkripsi', '🔓 Dekripsi']
        },
    ]).then(({ action }) => {
        if (action === '🔐 Enkripsi') {
            inquirer.prompt([
                {
                    type: "input",
                    name: "text",
                    message: "Masukkan teks yang ingin di Enkripsi:"
                },
                {
                    type: 'input',
                    name: 'key',
                    message: 'Masukkan key enkripsi:'
                }
            ]).then(({ text, key }) => {
                const encrypted = encrypt(text, key);
                console.log(chalk.green('Hasil Enkripsi:', encrypted));
            });
        } else {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'cipherText',
                    message: 'Masukkan teks terenkripsi:',
                },
                {
                    type: 'input',
                    name: 'key',
                    message: 'Masukkan key untuk dekripsi:'
                }
            ]).then(({ cipherText, key }) => {
                const decrypted = decrypt(cipherText, key);
                console.log(chalk.yellow('Hasil dekripsi:', decrypted))
            });
        }
    })
})