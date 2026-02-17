import fs from 'fs/promises';
import chalk from 'chalk';

const dataFile = 'users.json';

async function loadUsers() {
  try {
    const data = await fs.readFile(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT' || error instanceof SyntaxError) {
      return [];
    }
    throw error;
  }
}

async function saveUsers(users) {
  await fs.writeFile(dataFile, JSON.stringify(users, null, 2));
}

function askQuestion(query) {
  return new Promise((resolve) => {
    process.stdout.write(query);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    const onData = (data) => {
      process.stdin.removeListener('data', onData);
      process.stdin.pause();
      resolve(data.trim());
    };
    
    process.stdin.on('data', onData);
  });
}

// input password dengan masking asterisk menggunakan mode Raw TTY
function askPassword(query) {
  return new Promise((resolve) => {
    process.stdout.write(query);
    
    let password = '';
    const stdin = process.stdin;
    
    // mengaktifkan mode raw untuk input karakter per karakter
    if (stdin.isTTY && typeof stdin.setRawMode === 'function') {
      stdin.setRawMode(true);
      stdin.resume();
      stdin.setEncoding('utf8');
      
      const onKeypress = (key) => {
        // menangani tombol khusus
        switch (key) {
          case '\u0003': // tombol Ctrl+C
            cleanup();
            process.exit(130);
            break;
            
          case '\r':
          case '\n': // tombol Enter
            cleanup();
            process.stdout.write('\n');
            resolve(password);
            break;
            
          case '\u007f': // Backspace (Unix)
          case '\b': // Backspace (Windows)
            if (password.length > 0) {
              password = password.slice(0, -1);
              // pindahkan kursor ke belakang, tulis spasi untuk membersihkan, pindahkan ke belakang lagi
              process.stdout.write('\b \b');
            }
            break;
            
          default:
            // hanya menerima karakter ASCII yang dapat dicetak (spasi sampai tilde)
            if (key.charCodeAt(0) >= 32 && key.charCodeAt(0) <= 126) {
              password += key;
              process.stdout.write('*'); // tampilkan asterisk untuk setiap karakter
            }
            break;
        }
      };
      
      function cleanup() {
        stdin.removeListener('data', onKeypress);
        if (stdin.isTTY) {
          stdin.setRawMode(false);
        }
        stdin.pause();
      }
      
      stdin.on('data', onKeypress);
      
    } else {
      // fallback untuk lingkungan tanpa dukungan TTY
      console.log(chalk.yellow('\nWarning: TTY not available, password will be visible.'));
      askQuestion('').then(resolve);
    }
  });
}

async function login() {
  console.clear();
  console.log(chalk.blue.bold('=== Login ==='));
  
  const username = await askQuestion(chalk.yellow('Username: '));
  const password = await askPassword(chalk.yellow('Password: '));

  const users = await loadUsers();
  const user = users.find(u => u.username === username && u.password === password);

  console.log();
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
  
  const username = await askQuestion(chalk.yellow('Choose a username: '));
  const password = await askPassword(chalk.yellow('Choose a password: '));

  const users = await loadUsers();
  if (users.some(u => u.username === username)) {
    console.log();
    console.log(chalk.red('Username already exists.'));
  } else {
    users.push({
      username,
      password,
      status: 'offline',
      lastLogin: null
    });
    console.log();
    await saveUsers(users);
    console.log(chalk.green('Registration successful!'));
  }
}

async function logout() {
  console.clear();
  console.log(chalk.blue.bold('=== Logout ==='));
  
  const username = await askQuestion(chalk.yellow('Enter your username: '));

  const users = await loadUsers();
  const user = users.find(u => u.username === username);

  console.log();
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
  if (users.length === 0) {
    console.log(chalk.yellow('No users registered yet.'));
  } else {
    users.forEach(user => {
      const statusColor = user.status === 'online' ? chalk.green : chalk.red;
      console.log(chalk.cyan(`Username: ${user.username}`));
      console.log(statusColor(`Status: ${user.status}`));
      console.log(chalk.yellow(`Last Login: ${user.lastLogin || 'Never'}`));
      console.log('-'.repeat(30));
    });
  }
  console.log(); 
}

async function changePassword() {
  console.clear();
  console.log(chalk.blue.bold('=== Change Password ==='));
  
  const username = await askQuestion(chalk.yellow('Username: '));
  const currentPassword = await askPassword(chalk.yellow('Current Password: '));

  const users = await loadUsers();
  const user = users.find(u => u.username === username && u.password === currentPassword);

  console.log();
  if (user) {
    const newPassword = await askPassword(chalk.yellow('New Password: '));
    const confirmPassword = await askPassword(chalk.yellow('Confirm New Password: '));

    if (newPassword === confirmPassword) {
      user.password = newPassword;
      await saveUsers(users);
      console.log(chalk.green('Password changed successfully!'));
    } else {
      console.log(chalk.red('Password confirmation does not match.'));
    }
  } else {
    console.log(chalk.red('Invalid username or password.'));
  }
}

async function main() {
  let running = true;

  while (running) {
    console.log('\n');
    console.log(chalk.blue.bold('=== Main Menu ==='));
    console.log(chalk.yellow('1. Login'));
    console.log(chalk.yellow('2. Register'));
    console.log(chalk.yellow('3. Logout'));
    console.log(chalk.yellow('4. List Users'));
    console.log(chalk.yellow('5. Change Password'));
    console.log(chalk.yellow('6. Exit'));
    
    const choice = await askQuestion(chalk.magenta('Enter your choice (1-6): '));

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
        await changePassword();
        break;
      case '6':
        console.log(chalk.green('Goodbye!'));
        running = false;
        break;
      default:
        console.log(chalk.red('Invalid choice. Please try again.'));
    }
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow('\nGracefully shutting down...'));
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\nGracefully shutting down...'));
  process.exit(0);
});

// Starting application
main().catch(error => {
  console.error(chalk.red('Application error:'), error);
  process.exit(1);
});