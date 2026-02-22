import readline from 'readline';

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let turn = 'white';

function printBoard() {
  console.clear();
  console.log('  a b c d e f g h');
  board.forEach((row, rowIndex) => {
    const rowLabel = 8 - rowIndex;
    console.log(`${rowLabel} ${row.join(' ')}`);
  });
  console.log('\n');
}

function isValidMove(from, to, color) {
  const fromRow = 8 - parseInt(from[1]);
  const fromCol = from.charCodeAt(0) - 'a'.charCodeAt(0);
  const toRow = 8 - parseInt(to[1]);
  const toCol = to.charCodeAt(0) - 'a'.charCodeAt(0);
  
  const piece = board[fromRow][fromCol];

  if (piece === ' ') {
    return false;
  }

  if ((color === 'white' && piece === piece.toLowerCase()) || (color === 'black' && piece === piece.toUpperCase())) {
    return false;
  }

  if (piece === '♙' || piece === '♟') {
    const direction = (piece === '♙') ? -1 : 1;
    if (fromCol === toCol && (toRow === fromRow + direction || (toRow === fromRow + 2 * direction && fromRow === (piece === '♙' ? 6 : 1)))) {
      return true;
    }
  }

  return true;
}

function makeMove(from, to) {
  const fromRow = 8 - parseInt(from[1]);
  const fromCol = from.charCodeAt(0) - 'a'.charCodeAt(0);
  const toRow = 8 - parseInt(to[1]);
  const toCol = to.charCodeAt(0) - 'a'.charCodeAt(0);

  board[toRow][toCol] = board[fromRow][fromCol];
  board[fromRow][fromCol] = ' ';
}

function promptMove() {
  printBoard();
  rl.question(`${turn === 'white' ? 'White' : 'Black'}'s move (e.g., e2 e4): `, (input) => {
    const [from, to] = input.split(' ');
    
    if (isValidMove(from, to, turn)) {
      makeMove(from, to);
      turn = turn === 'white' ? 'black' : 'white';
    } else {
      console.log('Invalid move. Try again.');
    }
    
    promptMove();
  });
}

console.log('Welcome to CLI Chess!');
promptMove();
