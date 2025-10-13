import readline from 'readline';

// === Inisialisasi papan ===
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
  const letters = '    a   b   c   d   e   f   g   h';
  console.log(letters);
  console.log('  +---+---+---+---+---+---+---+---+');
  for (let i = 0; i < 8; i++) {
    let row = `${8 - i} |`;
    for (let j = 0; j < 8; j++) {
      row += ` ${board[i][j]} |`;
    }
    console.log(row + ` ${8 - i}`);
    console.log('  +---+---+---+---+---+---+---+---+');
  }
  console.log(letters);
}


function parseMove(pos) {
  const files = 'abcdefgh';
  const file = files.indexOf(pos[0]);
  const rank = 8 - parseInt(pos[1]);
  return [rank, file];
}

function isWhite(piece) {
  return '♙♖♘♗♕♔'.includes(piece);
}

function isBlack(piece) {
  return '♟♜♞♝♛♚'.includes(piece);
}

// === Fungsi validasi langkah per bidak ===
function isValidMove(from, to, currentPlayer) {
  const [fx, fy] = from;
  const [tx, ty] = to;
  const piece = board[fx][fy];
  const target = board[tx][ty];
  const dx = tx - fx;
  const dy = ty - fy;

  if (piece === ' ') return false;
  if (currentPlayer === 'white' && !isWhite(piece)) return false;
  if (currentPlayer === 'black' && !isBlack(piece)) return false;

  // Tidak bisa makan bidak sendiri
  if ((isWhite(piece) && isWhite(target)) || (isBlack(piece) && isBlack(target)))
    return false;

  // === Aturan pion ===
  if (piece === '♙') {
    if (fy === ty && board[tx][ty] === ' ') {
      if (fx === 6 && tx === 4 && board[5][ty] === ' ') return true; // langkah awal
      if (tx === fx - 1) return true; // langkah 1 petak
    }
    if (Math.abs(ty - fy) === 1 && tx === fx - 1 && isBlack(target)) return true; // makan serong
  }

  if (piece === '♟') {
    if (fy === ty && board[tx][ty] === ' ') {
      if (fx === 1 && tx === 3 && board[2][ty] === ' ') return true;
      if (tx === fx + 1) return true;
    }
    if (Math.abs(ty - fy) === 1 && tx === fx + 1 && isWhite(target)) return true;
  }

  // === Benteng ===
  if (piece === '♖' || piece === '♜') {
    if (fx !== tx && fy !== ty) return false; // hanya horizontal/vertikal
    if (!pathClear(fx, fy, tx, ty)) return false;
    return true;
  }

  // === Kuda ===
  if (piece === '♘' || piece === '♞') {
    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
  }

  // === Gajah ===
  if (piece === '♗' || piece === '♝') {
    if (Math.abs(dx) !== Math.abs(dy)) return false;
    if (!pathClear(fx, fy, tx, ty)) return false;
    return true;
  }

  // === Ratu ===
  if (piece === '♕' || piece === '♛') {
    const diagonal = Math.abs(dx) === Math.abs(dy);
    const straight = fx === tx || fy === ty;
    if (!(diagonal || straight)) return false;
    if (!pathClear(fx, fy, tx, ty)) return false;
    return true;
  }

  // === Raja ===
  if (piece === '♔' || piece === '♚') {
    return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
  }

  return false;
}

// === Cek apakah jalur kosong (untuk benteng, gajah, ratu) ===
function pathClear(fx, fy, tx, ty) {
  const stepX = Math.sign(tx - fx);
  const stepY = Math.sign(ty - fy);
  let x = fx + stepX;
  let y = fy + stepY;

  while (x !== tx || y !== ty) {
    if (board[x][y] !== ' ') return false;
    x += stepX;
    y += stepY;
  }
  return true;
}

function movePiece(from, to) {
  const [fx, fy] = from;
  const [tx, ty] = to;
  const piece = board[fx][fy];
  const target = board[tx][ty];

  // Jika raja dimakan → game selesai
  if (target === '♔' || target === '♚') {
    board[tx][ty] = piece;
    board[fx][fy] = ' ';
    printBoard();
    console.log(`🎉 Game selesai! ${piece === '♔' || piece === '♙' ? 'Putih' : 'Hitam'} menang!`);
    process.exit(0);
  }

  board[tx][ty] = piece;
  board[fx][fy] = ' ';
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentPlayer = 'white';

function nextTurn() {
  printBoard();
  rl.question(`${currentPlayer === 'white' ? 'Putih ♙' : 'Hitam ♟'} gerak (e.g. e2 e4): `, (input) => {
    const [fromStr, toStr] = input.trim().split(' ');
    if (!fromStr || !toStr) {
      console.log('❌ Format salah! Contoh: e2 e4');
      return nextTurn();
    }

    const from = parseMove(fromStr);
    const to = parseMove(toStr);

    if (!isValidMove(from, to, currentPlayer)) {
      console.log('❌ Langkah tidak valid!');
      return nextTurn();
    }

    movePiece(from, to);
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
    nextTurn();
  });
}

// === Mulai game ===
printBoard();
nextTurn();
