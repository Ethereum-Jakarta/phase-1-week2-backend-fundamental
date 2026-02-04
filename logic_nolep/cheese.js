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
  console.log('  a b c d e f g h');
  for (let i = 0; i < 8; i++) {
    let row = (8 - i) + ' ';
    for (let j = 0; j < 8; j++) {
      row += board[i][j] + ' ';
    }
    console.log(row);
  }
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

function isValidMove(from, to, currentPlayer) {
  const fromRow = 8 - parseInt(from[1]);
  const fromCol = from.charCodeAt(0) - 'a'.charCodeAt(0);
  const toRow = 8 - parseInt(to[1]);
  const toCol = to.charCodeAt(0) - 'a'.charCodeAt(0);
  const piece = board[fromRow][fromCol];
  const targetPiece = board[toRow][toCol];

 
  if ((currentPlayer === 'Putih' && piece === '♟') || (currentPlayer === 'Hitam' && piece === '♙')) {
    console.log('Anda tidak dapat menggerakkan bidak lawan!');
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
  const fromRow = 8 - parseInt(from[1]);
  const fromCol = from.charCodeAt(0) - 'a'.charCodeAt(0);
  const toRow = 8 - parseInt(to[1]);
  const toCol = to.charCodeAt(0) - 'a'.charCodeAt(0);

  if (isValidMove(from, to, currentPlayer)) {
    const targetPiece = board[toRow][toCol];

    
    if (targetPiece !== ' ') {
      console.log(`Bidak ${targetPiece} di posisi ${to} telah dibunuh!`);
    }

    
    board[toRow][toCol] = board[fromRow][fromCol];
    board[fromRow][fromCol] = ' ';
    printBoard();
    return true; 
  } else {
    console.log('Gerakan tidak valid!');
    return false; 
  }
}

let currentPlayer = 'Putih'; 

function playGame() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function askMove() {
    readline.question(`${currentPlayer}, masukkan gerakan (e.g., e2 e4): `, (input) => {
      const [from, to] = input.split(' ');

      
      if (!from || !to || from.length !== 2 || to.length !== 2) {
        console.log('Input tidak valid! Harap masukkan gerakan dalam format yang benar (e.g., e2 e4).');
        askMove();
        return;
      }

      if (movePiece(from, to)) {
        
        currentPlayer = currentPlayer === 'Putih' ? 'Hitam' : 'Putih'; 
      }
      askMove();
    });
  }

  printBoard(); 
  askMove();
}

playGame();