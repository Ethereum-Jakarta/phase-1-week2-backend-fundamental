import readline from "readline";
import { initialBoard, parsePosition, printBoard } from "./board.js";
import { WHITE, BLACK, getColor } from "./pieces.js";
import { isValidMove } from "./rules.js";

export class Game {
  constructor() {
    this.board = JSON.parse(JSON.stringify(initialBoard));
    this.turn = WHITE;

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  start() {
    console.log("=== CHESS GAME (Modular Version) ===");
    this.loop();
  }

  loop() {
    printBoard(this.board);

    this.rl.question(`${this.turn.toUpperCase()} move (e.g. e2 e4): `, (input) => {
      const [fromStr, toStr] = input.split(" ");

      if (!fromStr || !toStr) {
        console.log("Format salah.");
        return this.loop();
      }

      const from = parsePosition(fromStr);
      const to = parsePosition(toStr);

      const piece = this.board[from[0]][from[1]];
      const color = getColor(piece);

      if (!piece || piece === " ") {
        console.log("Tidak ada bidak.");
        return this.loop();
      }

      if (color !== this.turn) {
        console.log("Bukan giliran kamu.");
        return this.loop();
      }

      if (!isValidMove(this.board, from, to, piece, color)) {
        console.log("Gerakan tidak valid.");
        return this.loop();
      }

      // jalankan gerakan
      this.board[to[0]][to[1]] = piece;
      this.board[from[0]][from[1]] = " ";

      // giliran lawan
      this.turn = (this.turn === WHITE ? BLACK : WHITE);

      this.loop();
    });
  }
}
