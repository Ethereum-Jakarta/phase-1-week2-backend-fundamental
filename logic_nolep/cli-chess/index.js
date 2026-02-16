import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const board = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
];

let turn = "white";

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function displayBoard() {
  console.clear();
  console.log(chalk.yellow.bold("\n     a  b  c  d  e  f  g  h"));
  console.log(chalk.red.bold("   --------------------------"));
  for (let i = 0; i < board.length; i++) {
    let row = `${chalk.yellow.bold(8 - i)} ${chalk.red.bold("|")} `;
    for (let j = 0; j < board[i].length; j++) {
      row += ` ${chalk.blue.bold(board[i][j])} `;
    }
    row += ` ${chalk.red.bold("|")} ${chalk.yellow.bold(8 - i)}`;
    console.log(row);
  }
  console.log(chalk.red.bold("   --------------------------"));
  console.log(chalk.yellow.bold("     a  b  c  d  e  f  g  h\n"));
}

function isPathClear(fromRow, fromCol, toRow, toCol) {
  const rowStep = fromRow - toRow === 0 ? 0 : (toRow - fromRow) / Math.abs(toRow - fromRow);
  const colStep = fromCol - toCol === 0 ? 0 : (toCol - fromCol) / Math.abs(toCol - fromCol);

  let currRow = fromRow + rowStep;
  let currCol = fromCol + colStep;

  while (currRow !== toRow || currCol !== toCol) {
    if (board[currRow][currCol] !== " ") return false;
    currRow += rowStep;
    currCol += colStep;
  }

  return true;
}

function isValidMove(fromRow, fromCol, toRow, toCol) {
  const piece = board[fromRow][fromCol];
  const target = board[toRow][toCol];
  const isWhitePiece = "♙♘♗♖♕♔".includes(piece);
  const isTargetWhite = "♙♘♗♖♕♔".includes(target);

  if (piece === " " || (turn === "white" && !isWhitePiece) || (turn === "black" && isWhitePiece)) return false;
  if (turn === "white" && target !== " " && isTargetWhite) return false;
  if (turn === "black" && target !== " " && !isTargetWhite) return false;

  switch (piece) {
    case "♙":
      if (fromCol === toCol) {
        if (fromRow - toRow === 1 && target === " ") return true;
        if (fromRow === 6 && fromRow - toRow === 2 && board[fromRow - 1][fromCol] === " " && target === " ")
          return true;
      } else if (Math.abs(fromCol - toCol) === 1 && fromRow - toRow === 1 && target !== " ") {
        return true;
      }
      break;
    case "♟":
      if (fromCol === toCol) {
        if (toRow - fromRow === 1 && target === " ") return true;
        if (fromRow === 1 && toRow - fromRow === 2 && board[fromRow + 1][fromCol] === " " && target === " ")
          return true;
      } else if (Math.abs(fromCol - toCol) === 1 && toRow - fromRow === 1 && target !== " ") {
        return true;
      }
      break;
    case "♘":
    case "♞":
      if (Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 1) return true;
      if (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 2) return true;
      break;
    case "♗":
    case "♝":
      if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
        return isPathClear(fromRow, fromCol, toRow, toCol);
      }
      break;
    case "♖":
    case "♜":
      if (fromRow === toRow || fromCol === toCol) {
        return isPathClear(fromRow, fromCol, toRow, toCol);
      }
      break;
    case "♕":
    case "♛":
      if (fromRow === toRow || fromCol === toCol || Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
        return isPathClear(fromRow, fromCol, toRow, toCol);
      }
      break;
    case "♔":
    case "♚":
      if (Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1) {
        return isPathClear(fromRow, fromCol, toRow, toCol);
      }
      break;
  }

  return false;
}

function movePiece(from, to) {
  const fromRow = 8 - parseInt(from[1]);
  const fromCol = from.charCodeAt(0) - "a".charCodeAt(0);
  const toRow = 8 - parseInt(to[1]);
  const toCol = to.charCodeAt(0) - "a".charCodeAt(0);

  if (isValidMove(fromRow, fromCol, toRow, toCol)) {
    board[toRow][toCol] = board[fromRow][fromCol];
    board[fromRow][fromCol] = " ";
    turn = turn === "white" ? "black" : "white";
    displayBoard();
  } else {
    console.log(chalk.red("invalid input, try again!"));
  }
}

async function askMove() {
  const ask = await question(`${turn}, please input your move (e.g., e2 e4): `);
  const [from, to] = ask.split(" ");

  if (!/^[a-h][1-8]$/.test(from) || !/^[a-h][1-8]$/.test(to)) {
    console.log(chalk.red("invalid input, try again!"));
    return askMove();
  }

  movePiece(from, to);
  return askMove();
}

displayBoard();
askMove();
