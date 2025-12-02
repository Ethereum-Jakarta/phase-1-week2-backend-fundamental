const { encrypt, decrypt } = require('./cryptoApp');
const { scheduleTask } = require('./scheduleApp');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(q) {
    return new Promise((resolve) => rl.question(q, resolve));
}

async function encrypted() {
    console.log('\n--- Encrypt Text ---');
    const text = await ask('Enter text: ');
    const key = await ask('Enter key: ');
    const encryptedText = encrypt(text, key);
    console.log('Encrypted Text:', encryptedText);
    return main();
}

async function decrypted() {
    console.log('\n--- Decrypted Text ---');
    const textEncrypt = await ask('Enter encrypt text: ');
    const key = await ask('Enter key: ');
    const decryptedText = decrypt(textEncrypt, key);
    console.log('Decrypted Text:', decryptedText);;

}

async function schedule() {
    console.log('\n--- Schedule Task ---');
    const task = await ask('Enter Task: ');
    const schedule = scheduleTask(task);
    return schedule;
}

async function main() {
    console.log('\n--- Start Menu ---');
    console.log('1. Encrypted Text');
    console.log('2. Decrypted Text');
    console.log('3. Schedule Task');
    console.log('4. Exit');
    
    const choice = await ask('Choose an option: ');
    
    switch(choice) {
        case '1':
            await encrypted();
            break;
        case '2':
            await decrypted();
            break;
        case '3':
            await schedule();
            return main();
        case '4':
            console.log('GoodBye!');
            rl.close()
            break;
        default:
            console.log('Invalid choice');
    }
}

main();