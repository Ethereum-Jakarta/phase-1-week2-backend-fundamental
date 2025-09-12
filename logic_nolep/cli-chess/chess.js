import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let board = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
];

const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];
let currentPlayer = "white"; 


function printBoard() {
  console.clear();
  let header = "    a   b   c   d   e   f   g   h";
  console.log(header);
  console.log("  +---+---+---+---+---+---+---+---+");
  for (let i = 0; i < 8; i++) {
    let row = `${8 - i} |`;
    for (let j = 0; j < 8; j++) {
      row += ` ${board[i][j]} |`;
    }
    console.log(row + ` ${8 - i}`);
    console.log("  +---+---+---+---+---+---+---+---+");
  }
  console.log(header);
  console.log(`Giliran: ${currentPlayer === "white" ? "Putih ♙" : "Hitam ♟"}`);
}



function parsePosition(pos) {
  const col = cols.indexOf(pos[0]);
  const row = 8 - parseInt(pos[1]);
  return [row, col];
}


function isWhite(piece) {
  return "♙♖♘♗♕♔".includes(piece);
}
function isBlack(piece) {
  return "♟♜♞♝♛♚".includes(piece);
}

function isValidMove(from, to) {
  const [fr, fc] = from;
  const [tr, tc] = to;
  const piece = board[fr][fc];
  if (piece === " ") return false;

  const dr = tr - fr;
  const dc = tc - fc;

  if (piece === "♙") {
    
    if (fr === 6 && dr === -2 && dc === 0 && board[fr - 1][fc] === " " && board[tr][tc] === " ")
      return true;
    if (dr === -1 && dc === 0 && board[tr][tc] === " ") return true;
    if (dr === -1 && Math.abs(dc) === 1 && isBlack(board[tr][tc])) return true;
  } else if (piece === "♟") {
    
    if (fr === 1 && dr === 2 && dc === 0 && board[fr + 1][fc] === " " && board[tr][tc] === " ")
      return true;
    if (dr === 1 && dc === 0 && board[tr][tc] === " ") return true;
    if (dr === 1 && Math.abs(dc) === 1 && isWhite(board[tr][tc])) return true;
  } else if (piece === "♖" || piece === "♜") {
    
    if (fr === tr || fc === tc) return pathClear(from, to);
  } else if (piece === "♗" || piece === "♝") {
    
    if (Math.abs(dr) === Math.abs(dc)) return pathClear(from, to);
  } else if (piece === "♕" || piece === "♛") {
    
    if (fr === tr || fc === tc || Math.abs(dr) === Math.abs(dc)) return pathClear(from, to);
  } else if (piece === "♘" || piece === "♞") {
    
    if ((Math.abs(dr) === 2 && Math.abs(dc) === 1) || (Math.abs(dr) === 1 && Math.abs(dc) === 2))
      return true;
  } else if (piece === "♔" || piece === "♚") {
    
    if (Math.abs(dr) <= 1 && Math.abs(dc) <= 1) return true;
  }
  return false;
}

function pathClear(from, to) {
  const [fr, fc] = from;
  const [tr, tc] = to;
  const dr = Math.sign(tr - fr);
  const dc = Math.sign(tc - fc);

  let r = fr + dr;
  let c = fc + dc;
  while (r !== tr || c !== tc) {
    if (board[r][c] !== " ") return false;
    r += dr;
    c += dc;
  }

  const piece = board[fr][fc];
  const target = board[tr][tc];
  if (isWhite(piece) && isWhite(target)) return false;
  if (isBlack(piece) && isBlack(target)) return false;
  return true;
}

function playTurn() {
  printBoard();
  rl.question("Gerakan (misal: e2 e4): ", (move) => {
    if (move === "exit") {
      rl.close();
      return;
    }

    const [fromStr, toStr] = move.split(" ");
    if (!fromStr || !toStr) return playTurn();

    const from = parsePosition(fromStr);
    const to = parsePosition(toStr);

    const piece = board[from[0]][from[1]];
    if (piece === " ") {
      console.log("Tidak ada bidak di situ!");
      return playTurn();
    }

    if (currentPlayer === "white" && !isWhite(piece)) {
      console.log("Giliran Putih!");
      return playTurn();
    }
    if (currentPlayer === "black" && !isBlack(piece)) {
      console.log("Giliran Hitam!");
      return playTurn();
    }

    if (isValidMove(from, to)) {
      board[to[0]][to[1]] = piece;
      board[from[0]][from[1]] = " ";

      if (piece === "♙" || piece === "♟" || piece === "♖" || piece === "♜" || piece === "♗" || piece === "♝" || piece === "♘" || piece === "♞" || piece === "♕" || piece === "♛") {
        if (board.flat().indexOf("♔") === -1) {
          console.log("Hitam Menang!");
          rl.close();
          return;
        }
        if (board.flat().indexOf("♚") === -1) {
          console.log("Putih Menang!");
          rl.close();
          return;
        }
      }

      currentPlayer = currentPlayer === "white" ? "black" : "white";
    } else {
      console.log("Langkah tidak valid!");
    }
    playTurn();
  });
}

playTurn();
