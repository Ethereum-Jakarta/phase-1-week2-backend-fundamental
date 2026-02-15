import { parser } from "./helper.js";
import {
  getBishopMoves,
  getKingMoves,
  getKnightMoves,
  getPawnMoves,
  getQueenMoves,
  getRookMoves,
} from "./moves.js";

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

const piece = {
  "♙": { type: "pawn", color: "white", symbol: "♙" },
  "♖": { type: "rook", color: "white", symbol: "♖" },
  "♘": { type: "knight", color: "white", symbol: "♘" },
  "♗": { type: "bishop", color: "white", symbol: "♗" },
  "♕": { type: "queen", color: "white", symbol: "♕" },
  "♔": { type: "king", color: "white", symbol: "♔" },

  "♟": { type: "pawn", color: "black", symbol: "♟" },
  "♜": { type: "rook", color: "black", symbol: "♜" },
  "♞": { type: "knight", color: "black", symbol: "♞" },
  "♝": { type: "bishop", color: "black", symbol: "♝" },
  "♛": { type: "queen", color: "black", symbol: "♛" },
  "♚": { type: "king", color: "black", symbol: "♚" },
};

export function main(from, to, currentTurn) {
  const fPos = parser(from);
  const targetPos = parser(to);

  let piece = board[fPos.row][fPos.col];

  if (!piece || piece.color !== currentTurn) {
    console.log("Invalid selection.");
    return true; // Keep the game going so they can try again
  }

  const possibleMoves = getPossibleMoves(board, fPos.row, fPos.col, piece);
  const legal = possibleMoves?.find(
    ([row, col]) => row === targetPos.row && col === targetPos.col,
  );

  if (!legal) {
    console.log("Can't move piece there");
    return true; // Keep the game going
  }

  // Execute Move
  board[targetPos.row][targetPos.col] = piece;
  board[fPos.row][fPos.col] = null;

  printBoard();

  // Check if the move just ended the game
  const isOpponentKingAlive = isKing(currentTurn);
  if (!isOpponentKingAlive) {
    console.log(`Congratulations! ${currentTurn} wins!`);
    return false; // SIGNAL: Stop the game
  }

  return "moved"; // SIGNAL: Move successful, switch turns
}

function isKing(currentTurn) {
  const opponentColor = currentTurn === "white" ? "black" : "white";

  return board.some((row) =>
    row.some(
      (cell) => cell && cell.type === "king" && cell.color === opponentColor,
    ),
  );
}

function getPossibleMoves(board, row, col, piece) {
  switch (piece.type) {
    case "pawn":
      return getPawnMoves(board, row, col, piece);
    case "rook":
      return getRookMoves(board, row, col, piece);
    case "knight":
      return getKnightMoves(board, row, col, piece);
    case "bishop":
      return getBishopMoves(board, row, col, piece);
    case "queen":
      return getQueenMoves(board, row, col, piece);
    case "king":
      return getKingMoves(board, row, col, piece);
  }
}

export function createBoard() {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const symbol = board[row][col];
      board[row][col] = piece[symbol] ? piece[symbol] : null;
    }
  }
}

export function printBoard() {
  console.log("  a b c d e f g h");
  for (let i = 0; i < 8; i++) {
    let line = 8 - i + " ";
    for (let j = 0; j < 8; j++) {
      const cell = board[i][j];
      line += (cell ? cell.symbol : ".") + " ";
    }
    console.log(line);
  }
}
