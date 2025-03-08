import readline from 'readline';
import chalk from 'chalk'


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const delay = (ms) => new Promise(success => setTimeout(success, ms));

let turn = 'White'; 


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

function printBoard() {
 console.clear();
  console.log(chalk.yellow.bold( '\n', '   a  b  c  d  e  f  g  h'));
  console.log('  -------------------------');
  for (let i = 0; i < 8; i++) {
    let baris = `${8 - i} |`;
    for (let j = 0; j < 8; j++) {
      baris += ` ${board[i][j]} `;
    }
    console.log(chalk.blue(baris + `| ${8 - i}`));
  }
  console.log('  -------------------------');
  console.log(chalk.yellow.bold('    a  b  c  d  e  f  g  h', '\n'));
}

function isPathClear(fromRow, fromCol, toRow, toCol) {
  const rowStep = (toRow - fromRow) === 0 ? 0 : (toRow - fromRow) / Math.abs(toRow - fromRow);
  const colStep = (toCol - fromCol) === 0 ? 0 : (toCol - fromCol) / Math.abs(toCol - fromCol);

  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;

  while (currentRow !== toRow || currentCol !== toCol) {
    if (board[currentRow][currentCol] !== ' ') {
      return false;
    }
    currentRow += rowStep;
    currentCol += colStep;
  }
  return true;
}

function isValidMove(from, to, turn) { //e2 e4 white
  const fromRow = 8 - parseInt(from[1]); //2
  const fromCol = from.charCodeAt(0) - 'a'.charCodeAt(0); //4
  const toRow = 8 - parseInt(to[1]); //4
  const toCol = to.charCodeAt(0) - 'a'.charCodeAt(0); //4
  const piece = board[fromRow][fromCol];
  const targetPiece = board[toRow][toCol];

 
  if ((turn === 'White' && piece === '♟') || (turn === 'Black' && piece === '♙')) {
    console.log(chalk.red.bold('Anda tidak dapat menggerakkan bidak lawan!'));
    return false;
  }

  switch (piece) {
    case '♙': 
      if (fromCol === toCol) {
        
        if (fromRow - toRow === 1 && targetPiece === ' ') return true; 
        if (fromRow === 6 && fromRow - toRow === 2 && targetPiece === ' ') return true; 
      } else if (Math.abs(fromCol - toCol) === 1 && fromRow - toRow === 1 && targetPiece !== ' ') {
        return true; 
      }
      break;
    case '♟': 
      if (fromCol === toCol) {
        
        if (toRow - fromRow === 1 && targetPiece === ' ') return true; 
        if (fromRow === 1 && toRow - fromRow === 2 && targetPiece === ' ') return true; 
      } else if (Math.abs(fromCol - toCol) === 1 && toRow - fromRow === 1 && targetPiece !== ' ') {
        return true; 
      }
      break;
    case '♘': 
      if ((Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 1) ||
          (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 2)) {
        return true; 
      }
      break;
    case '♗': 
    case '♝':
      if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
        
        return isPathClear(fromRow, fromCol, toRow, toCol);
      }
      break;
    case '♖': 
    case '♜':
      if (fromRow === toRow || fromCol === toCol) {
        
        return isPathClear(fromRow, fromCol, toRow, toCol);
      }
      break;
    case '♕': 
    case '♛':
      if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol) || 
          fromRow === toRow || fromCol === toCol) {
        
        return isPathClear(fromRow, fromCol, toRow, toCol);
      }
      break;
    case '♔': 
    case '♚':
      if (Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1) {
        return true; 
      }
      break;
  }
  return false; 
}

function movePiece(from, to) {
  const fromRow = 8 - parseInt(from[1]); //2
  const fromCol = from.charCodeAt(0) - 'a'.charCodeAt(0); // 101 - 97 = 4
  const toRow = 8 - parseInt(to[1]); // 4
  const toCol = to.charCodeAt(0) - 'a'.charCodeAt(0); // 4

  if (isValidMove(from, to, turn)) {
    const targetPiece = board[toRow][toCol];
    if (targetPiece !== ' ') {
      console.log(`Bidak ${targetPiece} telah dibunuh!`);
    }
    board[toRow][toCol] = board[fromRow][fromCol];
    board[fromRow][fromCol] = ' ';
    printBoard();
    return true; 
  } else {
    console.log('Move is not correct, please try again!');
    return false; 
  }
}

const askMove = async () => {
  return new Promise(success => {
    rl.question(chalk.whiteBright(`${turn}, please input your move (e.g., e2 e4): `), (input) => {
      const moves = input.split(" ");
      const [from, to] = moves;

      if (!moves[0] || !moves[1] || moves.length !== 2 || moves[0].length !== 2 || moves[1].length !== 2) {
        console.log(chalk.red.bold(`Invalid Move! Try again with correct input (e.g., e2 e4).`));
        return success(askMove());  
      }

      if (movePiece(from, to)) {
        turn = turn === 'White' ? 'Black' : 'White'; 
      }

      success(); 
    });
  });
};

async function playGame() {
  await delay(1000);
  printBoard(); 
  while (true) {
    await askMove();
  }
}


async function welcomeUser() {
  await delay(1000);
  console.log(chalk.bgWhiteBright.bold('  Welcome to CLI Chess Game! ', "\n"));
  await delay(1000);
  console.log(chalk.bgGreenBright.bold('  Halo, User! ', "\n"));
  await delay(1000);
  console.log(chalk.bgWhiteBright.bold('  Selamat bermain! ', "\n"));
}

(async() => {
  await welcomeUser()
  await playGame();
})()


