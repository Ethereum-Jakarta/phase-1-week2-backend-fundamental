import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

import { encrypt, decrypt } from './cryptoApp.js';
import { scheduleTask } from './scheduleApp.js';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const title = chalkAnimation.rainbow(
        'Welcome to my app!! \n'
    );

    await sleep();
    title.stop();
}

async function choices() {
    const answers = await inquirer.prompt({
        name: 'select',
        type: 'list',
        message: `
        ${chalk.bgGreen('Select a task!')}
        `,
        choices: [
            'Encrypt & Decrypt',
            'Set schedule task',
        ]
    });

    return handleAnswer(answers.select);
}

async function handleAnswer(answer) {
    const spinner = createSpinner('Wait a second...').start();
    await sleep();
    spinner.stop();

    if (answer == 'Encrypt & Decrypt') {
        const text = await inputDecrypt();
        const secret = await secretKeys();
        await sleep()

        if (text.length === 0 || secret.length === 0) {
            spinner.error({ text: "Do not empty the text or secret input!!" });
            process.exit();
        }

        const encryptedText = encrypt(text, secret);
        const decryptedText = decrypt(encryptedText, secret);

        spinner.success({ text: `Your text after encrypted: ${encryptedText}` });
        spinner.success({ text: `Your text before encrypted: ${decryptedText}` });
    } else {
        const task = await scheduleApp();
        await sleep();

        if (task.length === 0) {
            spinner.error({ text: "Do not empty your task input!!" });
            process.exit();
        }

        const schedule = scheduleTask(task);

        spinner.success({ text: `Scheduled task for: ${schedule}` });
    }
}

async function inputDecrypt() {
    const answers = await inquirer.prompt({
        name: 'decrypt',
        type: 'input',
        message: 'Input your text to decrypt here:',
    });

    return (answers.decrypt);
}

async function secretKeys() {
    const answers = await inquirer.prompt({
        name: 'secret',
        type: 'input',
        message: 'Input your secret keys here:',
    });

    return (answers.secret);
}

async function scheduleApp() {
    const answers = await inquirer.prompt({
        name: 'schedule',
        type: 'input',
        message: 'Input your task to be scheduled here:',
    });

    return (answers.schedule);
}

async function closed() {
    const message = 'Thank You!!!'

    figlet(message, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

await welcome();
await choices();
await sleep();
await closed();