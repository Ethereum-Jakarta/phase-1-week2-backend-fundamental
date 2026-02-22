import Table from 'cli-table3';
import chalk from 'chalk';
import readline from 'readline';
import fs from 'fs/promises';

const red = chalk.red;
const gray = chalk.gray;

// let table = new Table({
//   head: [' ', ...'abcdefgh'.split('').map(letter => red(`${letter}`))],
//   colWidths: [4, 4, 4, 4, 4, 4, 4, 4, 4],
//   wordWrap: false,
//   style: {
//     head: [],
//     border: []
//   },
//   chars: {
//     top: gray('─'),
//     'top-mid': gray('┬'),
//     'top-left': gray('┌'),
//     'top-right': gray('┐'),
//     bottom: gray('─'),
//     'bottom-mid': gray('┴'),
//     'bottom-left': gray('└'),
//     'bottom-right': gray('┘'),
//     left: gray('│'),
//     'left-mid': gray('├'),
//     mid: gray('─'),
//     'mid-mid': gray('┼'),
//     right: gray('│'),
//     'right-mid': gray('┤'),
//     middle: gray('│')
//   }
// });

const mainBoard = [
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

let user = null;
let board = [];
let turn = "white";
let gameOver = false;

function printBoard() {
  let newTable = new Table({
    head: [' ', ...'abcdefgh'.split('').map(letter => red(`${letter}`))],
    colWidths: [4, 4, 4, 4, 4, 4, 4, 4, 4],
    wordWrap: false,
    style: {
      head: [],
      border: []
    },
    chars: {
      top: gray('─'),
      'top-mid': gray('┬'),
      'top-left': gray('┌'),
      'top-right': gray('┐'),
      bottom: gray('─'),
      'bottom-mid': gray('┴'),
      'bottom-left': gray('└'),
      'bottom-right': gray('┘'),
      left: gray('│'),
      'left-mid': gray('├'),
      mid: gray('─'),
      'mid-mid': gray('┼'),
      right: gray('│'),
      'right-mid': gray('┤'),
      middle: gray('│')
    }
  });

  board.forEach((row, i) => {
    const rowLabel = red((8 - i).toString());
    newTable.push([rowLabel, ...row]);
  });

  console.log(newTable.toString()); 
  newTable = null;
}

async function loadUsers() {
  try {
    const data = await fs.readFile('games.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.log('Tidak ada file games.json. Akan dibuat file baru.');
  }
}

async function loadGames() {
  user = await loadUsers();
  turn = user[0].lastTurn;
  board = user[1];

  console.log(chalk.cyan('Wellcome back'), 
    chalk.yellow(user[0].white.username) + ",", 
    chalk.yellow(user[0].black.username)  + '!'
  );

  startGame()
}

async function saveUsers() {
  await fs.writeFile('games.json', JSON.stringify(user, null, 2));
}

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function newGame() {
  user = [
    {
      white: {
        piece: "♜♞♝♛♚♝♞♜♟♟♟♟♟♟♟♟"
      },
      black: {
        piece: "♖♘♗♕♔♗♘♖♙♙♙♙♙♙♙♙"
      },
      lastTurn: "white"
    },
    mainBoard
  ];

  user[0].white.username = await question(chalk.cyan('Username white: '));
  user[0].black.username = await question(chalk.cyan('Username black: '));
  await saveUsers(user);
  turn = "white";
  board = user[1];

  console.clear();
  console.log(chalk.cyan('Wellcome back'), 
    chalk.yellow(user[0].white.username) + ",", 
    chalk.yellow(user[0].black.username)  + '!'
  );

  startGame();

}

function parseInput(input) {
  const columns = 'abcdefgh';
  const [from, to] = input.split(' ');

  if (!from || !to || from.length !== 2 || to.length !== 2) return null;

  const fromCol = columns.indexOf(from[0]);
  const fromRow = 8 - parseInt(from[1], 10);
  const toCol = columns.indexOf(to[0]);
  const toRow = 8 - parseInt(to[1], 10);

  if (fromCol === -1 || toCol === -1 || fromRow < 0 || toRow < 0) return null;

  return { fromRow, fromCol, toRow, toCol };
}

function movePiece(input) {
  const move = parseInput(input);
  if (!move) {
    console.log(chalk.red.bold('Invalid input! use this format: "e2 e4".'));
    return false;
  }

  const { fromRow, fromCol, toRow, toCol } = move;
  const piece = board[fromRow][fromCol];
  const target = board[toRow][toCol];

  if (piece === ' ') {
    console.log(chalk.red.bold('There is no piece in the starting position!'));
    return false;
  }

  const whitePieces = "♖♘♗♕♔♙".split("");
  const blackPieces = "♜♞♝♛♚♟".split("");

  if (turn === "white" && !whitePieces.includes(piece)) {
    console.log(chalk.red("White's turn!"));
    return false;
  }

  if (turn === "black" && !blackPieces.includes(piece)) {
    console.log(chalk.red("Black's turn!"));
    return false;
  }

  const direction = (turn === "white") ? -1 : 1;
  const isWhite = whitePieces.includes(piece);
  const isEnemy = (p) => p !== ' ' && (isWhite ? blackPieces.includes(p) : whitePieces.includes(p));
  const deltaRow = toRow - fromRow;
  const deltaCol = toCol - fromCol;

  // --- RULES ---

  // PAWN
  if (piece === '♙' || piece === '♟') {
    const startRow = isWhite ? 6 : 1;

    const isForwardMove = fromCol === toCol && target === ' ';
    const isSingleStep = toRow === fromRow + direction;
    const isDoubleStep = fromRow === startRow && toRow === fromRow + 2 * direction;

    const isDiagonalCapture =
      Math.abs(fromCol - toCol) === 1 &&
      toRow === fromRow + direction &&
      isEnemy(target);

    if (!(isForwardMove && (isSingleStep || isDoubleStep)) && !isDiagonalCapture) {
      console.log(chalk.red('Invalid pawn move.'));
      return false;
    }
  }

  // ROOK
  else if (piece === '♖' || piece === '♜') {
    if (fromRow !== toRow && fromCol !== toCol) {
      console.log(chalk.red('Invalid rook move.'));
      return false;
    }
    if (!isPathClear(fromRow, fromCol, toRow, toCol)) {
      console.log(chalk.red('Rook path is blocked.'));
      return false;
    }
  }

  // BISHOP
  else if (piece === '♗' || piece === '♝') {
    if (Math.abs(deltaRow) !== Math.abs(deltaCol)) {
      console.log(chalk.red('Invalid bishop move.'));
      return false;
    }
    if (!isPathClear(fromRow, fromCol, toRow, toCol)) {
      console.log(chalk.red('Bishop path is blocked.'));
      return false;
    }
  }

  // KNIGHT
  else if (piece === '♘' || piece === '♞') {
    const moves = [
      [2, 1], [1, 2], [-1, 2], [-2, 1],
      [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];
    const isValid = moves.some(([dr, dc]) => dr === deltaRow && dc === deltaCol);
    if (!isValid) {
      console.log(chalk.red('Invalid knight move.'));
      return false;
    }
  }

  // QUEEN
  else if (piece === '♕' || piece === '♛') {
    const isDiagonal = Math.abs(deltaRow) === Math.abs(deltaCol);
    const isStraight = fromRow === toRow || fromCol === toCol;
    if (!(isDiagonal || isStraight)) {
      console.log(chalk.red('Invalid queen move.'));
      return false;
    }
    if (!isPathClear(fromRow, fromCol, toRow, toCol)) {
      console.log(chalk.red('Queen path is blocked.'));
      return false;
    }
  }

  // KING
  else if (piece === '♔' || piece === '♚') {
    if (Math.abs(deltaRow) > 1 || Math.abs(deltaCol) > 1) {
      console.log(chalk.red('Invalid king move.'));
      return false;
    }
  }

  // Cegah makan bidak sendiri
  if (isWhite && whitePieces.includes(target)) {
    console.log(chalk.red('Cannot capture own piece.'));
    return false;
  }
  if (!isWhite && blackPieces.includes(target)) {
    console.log(chalk.red('Cannot capture own piece.'));
    return false;
  }

  if (target === '♔' || target === '♚') {
    console.log(chalk.green.bold(`\n${turn === 'white'? chalk.yellow(user[0].white.username) : chalk.yellow(user[0].black.username)} wins! ${target === '♔' ? 'White' : 'Black'} king has been captured.`));
    gameOver = true;
  }

  // --- EXECUTE MOVE ---
  board[toRow][toCol] = piece;
  board[fromRow][fromCol] = ' ';
  
  return true;
}

// Helper untuk mengecek apakah lintasan kosong
function isPathClear(fromRow, fromCol, toRow, toCol) {
  const rowStep = Math.sign(toRow - fromRow);
  const colStep = Math.sign(toCol - fromCol);

  let r = fromRow + rowStep;
  let c = fromCol + colStep;

  while (r !== toRow || c !== toCol) {
    if (board[r][c] !== ' ') return false;
    r += rowStep;
    c += colStep;
  }
  return true;
}

async function startGame() {
  
  while (true) {
    // console.log("\n")
    // console.clear()
    // console.log("ffffffffffffffffffffff")
    console.log("\n")
    console.log(chalk.cyan("Type 'out' to save and leave the game."))
    printBoard();
    console.log(chalk.grey("Turn example: e2 e4"));
    const input = await question(
      chalk.magenta(
        `${turn === "white" ? chalk.yellow(user[0].white.username) : chalk.yellow(user[0].black.username) } (${turn} ${(turn === "white") ? "♔" : "♚"} ) turn: `
      ));

    if (input === "out") {
      user[0].lastTurn = turn;
      user[1] = board;
      await saveUsers();
      return startMenu();
    }
  
    if (movePiece(input)) {
      turn = (turn === "white") ? "black" : "white"; // Ganti giliran
    }
    if (gameOver) {
      return startMenu();
    } 
  }
  
}

async function startMenu() {
  while(true) {
      console.log('\n');
      console.log(chalk.blue.bold('=== Chess MasterLimbad ==='));
      console.log(chalk.yellow('1. New Game'));
      console.log(chalk.yellow('2. Previous Game'));
      console.log(chalk.yellow('3. Out'));
      const choice = await question(chalk.magenta('Enter your choice (1-3): '));

      switch (choice) {
          case "1":
              await newGame()
              return;
      
          case "2":
              await loadGames()
              return;
          
          case "3":
              console.log(chalk.green('Thanks for playing!'));
              rl.close();
              return;

          default:
              break;
      }
  }
}

async function main() {
  startMenu();
}

main();