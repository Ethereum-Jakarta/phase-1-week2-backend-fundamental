# CLI App (With Chalk)

Mungkin kebanyakan dari kalian hanya tau bahwa di dunia pemrograman suatu program akan dijalankan pada tombol atau fitur lainnya pada sebuah tampilan website
tetapi kenyataanya tidak. sebuah program pada dasarnya dijalankan dalam bentuk CLI ( **Command Line Interface** ) hanya berisi tulisan dan barisan tidak ada yang lain
oleh karna itu kita akan membahas CLI sebelum nantinya kalian akan menyentuh dunia front end dengan membuat aplikasi di CLI

**Mengapa Membuat Aplikasi CLI?**

  - Mengotomatiskan tugas
  - Membuat alat untuk pengembang
  - Berinteraksi dengan sistem dan mengelola alur

**Contoh Dunia Nyata?**

  - CLI yang mengelola alur kerja dinamis dalam alur CI/CD — tidak ada lagi konfigurasi manual atau menunggu di antara proses.
  - CLI yang menyiapkan dan mengelola lingkungan pengembangan berbasis docker lokal.  
  - CLI yang menjalankan langkah-langkah yang telah ditetapkan sebelumnya untuk migrasi.

Mari kita belajar **learn by building** membuat CLI Sistem **Login or Not**

## Set Up

1. buat folder untuk menaruh project baru kalian
```
mkdir my-node-cli
cd my-node-cli
```
buat project kalian
```
npm init -y
```

jangan lupa kita menggunakan modul berarti perlu menambahkan `"type": "module"` pada package.json kita

```json
{
  "name": "chalk",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "chalk": "^5.3.0"
  }
}
````

2. install module
disini kita hanya akan menggunakan module `chalk` untuk memperindah tampilan CLI kita
```
npm install chalk
```

3. buatlah file js kita dan tiru code di bawah
   
```js
import fs from 'fs/promises';
import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const dataFile = 'users.json';

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

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function login() {
  console.clear();
  console.log(chalk.blue.bold('=== Login ==='));
  const username = await question(chalk.yellow('Username: '));
  const password = await question(chalk.yellow('Password: '));

  const users = await loadUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    user.status = 'online';
    user.lastLogin = new Date().toISOString();
    await saveUsers(users);
    console.log(chalk.green('Login successful!'));
    console.log(chalk.cyan(`Welcome back, ${username}!`));
  } else {
    console.log(chalk.red('Invalid username or password.'));
  }
}

async function register() {
  console.clear();
  console.log(chalk.blue.bold('=== Register ==='));
  const username = await question(chalk.yellow('Choose a username: '));
  const password = await question(chalk.yellow('Choose a password: '));

  const users = await loadUsers();
  if (users.some(u => u.username === username)) {
    console.log(chalk.red('Username already exists.'));
  } else {
    users.push({
      username,
      password,
      status: 'offline',
      lastLogin: null
    });
    await saveUsers(users);
    console.log(chalk.green('Registration successful!'));
  }
}

async function logout() {
  console.clear();
  console.log(chalk.blue.bold('=== Logout ==='));
  const username = await question(chalk.yellow('Enter your username: '));

  const users = await loadUsers();
  const user = users.find(u => u.username === username);

  if (user && user.status === 'online') {
    user.status = 'offline';
    await saveUsers(users);
    console.log(chalk.green(`${username} has been logged out.`));
  } else {
    console.log(chalk.red('User not found or not logged in.'));
  }
}

async function listUsers() {
  console.clear();
  console.log(chalk.blue.bold('=== User List ==='));
  const users = await loadUsers();
  users.forEach(user => {
    const statusColor = user.status === 'online' ? chalk.green : chalk.red;
    console.log(chalk.cyan(`Username: ${user.username}`));
    console.log(statusColor(`Status: ${user.status}`));
    console.log(chalk.yellow(`Last Login: ${user.lastLogin || 'Never'}`));
    console.log('-'.repeat(30));
  });
}

async function main() {
  while (true) {
    console.log('\n');
    console.log(chalk.blue.bold('=== Main Menu ==='));
    console.log(chalk.yellow('1. Login'));
    console.log(chalk.yellow('2. Register'));
    console.log(chalk.yellow('3. Logout'));
    console.log(chalk.yellow('4. List Users'));
    console.log(chalk.yellow('5. Exit'));
    const choice = await question(chalk.magenta('Enter your choice (1-5): '));

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
        console.log(chalk.green('Goodbye!'));
        rl.close();
        return;
      default:
        console.log(chalk.red('Invalid choice. Please try again.'));
    }
  }
}

main();
```

pada code diatas memiliki fitur-fitur aplikasi ini meliputi:

  - Login: Pengguna dapat masuk dengan username dan password mereka.
  - Register: Pengguna baru dapat mendaftar.
  - Logout: Pengguna yang sudah login dapat keluar.
  - List Users: Menampilkan daftar semua pengguna, status mereka, dan waktu login terakhir.
  - Data disimpan dalam file users.json.
  - Menggunakan chalk untuk mewarnai output CLI, membuat tampilan lebih menarik.

Aplikasi ini menggunakan file JSON untuk menyimpan data pengguna. File users.json akan dibuat otomatis saat pertama kali Anda mendaftarkan pengguna.

4. jalankan code
```
node "namaFile.js"
```

pada saat dijalnkan akan memunculkan tampilan CLI seperti di bawah ini

![image](https://github.com/user-attachments/assets/ca2ea7c6-8d55-41dd-adc1-a30c25fbcb1a)

## Bedah Code

mari kita bedah code sebelumnya
```js
import fs from 'fs/promises';
import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const dataFile = 'users.json';
```
pada tahap ini kita inisialisasi module dan data file kita yang berbentuk `users.json`

```js
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
```

di tahap ini membuat fungsi `loadUsers()` untuk mengambil data user nantinya di file `.json` dan `saveUser()` untuk menyimpan

```js
function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}
```
fungsi untuk memberikan pertanyaan pada user

```js
async function login() {
  console.clear();
  console.log(chalk.blue.bold('=== Login ==='));
  const username = await question(chalk.yellow('Username: '));
  const password = await question(chalk.yellow('Password: '));

  const users = await loadUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    user.status = 'online';
    user.lastLogin = new Date().toISOString();
    await saveUsers(users);
    console.log(chalk.green('Login successful!'));
    console.log(chalk.cyan(`Welcome back, ${username}!`));
  } else {
    console.log(chalk.red('Invalid username or password.'));
  }
}
```

fungsi login ini untuk login dengan user yang sudah terdaftar pada file `.json`. jika user berhasil login maka akan menampilkan status `online`

```js
async function register() {
  console.clear();
  console.log(chalk.blue.bold('=== Register ==='));
  const username = await question(chalk.yellow('Choose a username: '));
  const password = await question(chalk.yellow('Choose a password: '));

  const users = await loadUsers();
  if (users.some(u => u.username === username)) {
    console.log(chalk.red('Username already exists.'));
  } else {
    users.push({
      username,
      password,
      status: 'offline',
      lastLogin: null
    });
    await saveUsers(users);
    console.log(chalk.green('Registration successful!'));
  }
}
```

fungsi register untuk mendaftarkan user ke dalam data `.json`

```js
async function logout() {
  console.clear();
  console.log(chalk.blue.bold('=== Logout ==='));
  const username = await question(chalk.yellow('Enter your username: '));

  const users = await loadUsers();
  const user = users.find(u => u.username === username);

  if (user && user.status === 'online') {
    user.status = 'offline';
    await saveUsers(users);
    console.log(chalk.green(`${username} has been logged out.`));
  } else {
    console.log(chalk.red('User not found or not logged in.'));
  }
}
```

fungsi logout untuk memberikan status `offline` jika kita sedang login

```js
async function listUsers() {
  console.clear();
  console.log(chalk.blue.bold('=== User List ==='));
  const users = await loadUsers();
  users.forEach(user => {
    const statusColor = user.status === 'online' ? chalk.green : chalk.red;
    console.log(chalk.cyan(`Username: ${user.username}`));
    console.log(statusColor(`Status: ${user.status}`));
    console.log(chalk.yellow(`Last Login: ${user.lastLogin || 'Never'}`));
    console.log('-'.repeat(30));
  });
}
```

fungsi list user untuk menampilkan semua user dan beserta statusnya

```js
async function main() {
  while (true) {
    console.log('\n');
    console.log(chalk.blue.bold('=== Main Menu ==='));
    console.log(chalk.yellow('1. Login'));
    console.log(chalk.yellow('2. Register'));
    console.log(chalk.yellow('3. Logout'));
    console.log(chalk.yellow('4. List Users'));
    console.log(chalk.yellow('5. Exit'));
    const choice = await question(chalk.magenta('Enter your choice (1-5): '));

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
        console.log(chalk.green('Goodbye!'));
        rl.close();
        return;
      default:
        console.log(chalk.red('Invalid choice. Please try again.'));
    }
  }
}

main();
```

function untuk menjalankan semua code di atas dan menampilkan CLI 

# Logic Nolep 
tugas kali ini kalian akan di tugaskan untuk menambah fitur di code atas berikut ini:
  - pada saat menulis password harus diganti menjadi ***** tidak boleh dalam bentuk teks
  - bikin fitur untuk ganti password






