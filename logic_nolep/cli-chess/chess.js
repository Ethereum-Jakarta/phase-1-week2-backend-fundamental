import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Papan catur
const board = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

let currentPlayer = 'white'; 

function displayBoard() {
  console.log(chalk.blue('  a b c d e f g h'));
  for (let i = 0; i < 8; i++) {
    let row = chalk.yellow(`${8 - i} `);
    for (let j = 0; j < 8; j++) {
        if (board[i][j] === ' ') {
            row = row + board[i][j] 
        }else{
            row = row + board[i][j] + " "
        }
    }
    console.log(row);
  }
  console.log(chalk.blue('  a b c d e f g h\n'));
}

function isValidMove(start, end) {
  const [startRow, startCol] = start;
  const [endRow, endCol] = end;

  const piece = board[startRow][startCol];
  if (piece === ' ') return false;

  return true;
}

function movePiece(start, end) {
  const [startRow, startCol] = start;
  const [endRow, endCol] = end;

  board[endRow][endCol] = board[startRow][startCol];
  board[startRow][startCol] = ' ';
}

function playGame() {
  displayBoard();
  
  rl.question(chalk.green(`${currentPlayer === 'white' ? 'Putih' : 'Hitam'}, masukkan gerakan (e.g., e2 e4): `), (input) => {
    const [from, to] = input.split(' ');
    
    const start = [8 - parseInt(from[1]), from.charCodeAt(0) - 97];
    const end = [8 - parseInt(to[1]), to.charCodeAt(0) - 97];

    if (isValidMove(start, end)) {
      movePiece(start, end);
      currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
    } else {
      console.log(chalk.red('Gerakan tidak valid, silakan coba lagi.'));
    }

    playGame(); 
  });
}

playGame();
