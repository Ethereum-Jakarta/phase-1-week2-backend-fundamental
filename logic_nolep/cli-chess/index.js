import { Chess } from "chess.js";
import readline from "readline";

class ChessGame {
    constructor() {
        this.game = new Chess();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    start() {
        console.clear();
        console.log(`Selamat datang di Catur CLI`);
        this.printBoard();
        this.nextTurn();
        // this.rl.close();
    }

    printBoard() {
        const board = this.game.board();
        const symbols = {
            p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚',
            P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔',
        }
        console.log('\n    a  b  c  d  e  f  g  h');
        console.log("    ----------------------")
        for (let i = 0; i < 8; i++) {
            let rowStr = `${8 - i} |`
            for (let j = 0; j < 8; j++) {
                const piece = board[i][j];
                if (piece === null) {
                    rowStr += " . "
                } else {
                    const key = piece.color === "w" ? piece.type.toUpperCase() : piece.type;
                    rowStr += ` ${symbols[key]} `
                }
            }
            rowStr += `| ${8 - i}`;
            console.log(rowStr)
        }
        console.log("    ----------------------")
        console.log('    a  b  c  d  e  f  g  h\n');
    }

    nextTurn() {
        if (this.game.isGameOver()) {
            this.handleGameOver();
            return;
        }

        const turn = this.game.turn() === "w" ? "putih" : "hitam";
        this.rl.question(`${turn} jalan (misal: e2e4): `, (input) => {
            const move = this.game.move(input, { sloppy: true });
            if (!move) {
                console.log("Langkah tidak valid. Coba lagi");
            } else {
                if (this.game.inCheck()) {
                    console.log("Skak!!")
                }
            }

            this.printBoard();
            this.nextTurn();
        })
    }

    handleGameOver() {
        if (this.game.isCheckmate()) {
            console.log(`Skakmat! Pemenang: ${this.game.turn() === "w" ? "Hitam" : "Putih"}`);
        } else if (this.game.isStalemate()) {
            console.log("Stalemate! seri.")
        } else if (this.game.isDraw()) {
            console.log("Seri!")
        } else {
            console.log("Game Over")
        }

        this.rl.close();
    }
}

const game = new ChessGame();
game.start()