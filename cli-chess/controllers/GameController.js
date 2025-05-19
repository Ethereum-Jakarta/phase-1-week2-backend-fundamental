import readline from 'readline';
import { Game } from '../models/Game.js';
import { ConsoleView } from '../views/ConsoleView.js';
import { parsePosition, isValidInput } from '../utils/helpers.js';
import { isCheckmate, isCheck, hasLegalMoves } from '../utils/chessRules.js';


export class GameController {
  constructor() {
    this.game = new Game();
    this.view = new ConsoleView();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  startMenu() {
    console.clear();
    console.log("===========================");
    console.log("      CLI Chess Game       ");
    console.log("===========================");
    console.log("1. Mulai Permainan");
    console.log("2. Petunjuk");
    console.log("3. Keluar");
    console.log("---------------------------");

    this.rl.question("Masukkan pilihan (1-3): ", (choice) => {
      switch (choice.trim()) {
        case '1':
          this.start(); // mulai game
          break;
        case '2':
          this.showInstructions();
          break;
        case '3':
          console.log("\nSampai jumpa! 👋");
          this.rl.close();
          break;
        default:
          console.log("Pilihan tidak valid. Silakan coba lagi.\n");
          this.startMenu(); // tampilkan ulang
      }
    });
  }

  showInstructions() {
    console.clear();
    console.log("=== Petunjuk Permainan ===");
    console.log("- Gunakan format langkah seperti: e2 e4");
    console.log("- Tujuan permainan: skakmat raja lawan.");
    console.log("- En passant, promosi pion, dan skakmat didukung.");
    console.log("- Ketik langkah saat giliran Anda.");
    console.log("\nTekan ENTER untuk kembali ke menu...");
    this.rl.question('', () => this.startMenu());
  }


  start() {
    this.view.printBoard(this.game.board);
    this.rl.question(`\n Giliran ${this.game.currentPlayer} → Masukkan langkah : `, (input) => {
      this.handleMove(input);
    });
  }

  handleMove(input) {
    const [from, to] = input.trim().split(' ');

    if (!from || !to || !isValidInput(from, to)) {
      this.view.showError('Format salah.');
      return this.start();
    }

    if (!isValidInput(from, to)) {
      this.view.showError('Format salah.');
      return this.start();
    }

    const fromCoord = parsePosition(from);
    const toCoord = parsePosition(to);

    const result = this.game.movePiece(fromCoord, toCoord);
    if (result.error) {
      this.view.showError(result.error);
      return this.start();
    }

    if (result.capture) {
      this.view.showCapture(result.piece, result.capture);
    }
    
    if (result.promotion) {
      this.view.showPromotion(result.promotedTo);
    }

    this.view.printBoard(this.game.board);

    // Setelah langkah, currentPlayer sudah berganti ke lawan
    const gameEnded = this.checkGameState(this.game.currentPlayer);

    if (!gameEnded) {
      this.start();
    }
  }

  checkGameState(player) {
    const board = this.game.board;

    if (isCheckmate(player, board, this.game)) {
      const winner = player === 'white' ? 'black' : 'white';
      this.view.showCheckmate(winner);
      this.rl.close();
      return true;
    }

    if (isCheck(player, board)) {
      this.view.showCheck(player);
      return false;
    }

    if (!hasLegalMoves(player, board, this.game)) {
      this.view.showDraw(player);
      this.rl.close();
      return true;
    }

    return false;
  }
}
