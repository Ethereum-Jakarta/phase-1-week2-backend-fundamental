import { Board } from './Board.js';
import { isCheck } from '../utils/chessRules.js';
import { Queen } from '../models/pieces/Queen.js'; 

export class Game {
  constructor() {
    this.board = new Board();
    this.currentPlayer = 'white';
    this.lastMove = null; // untuk menyimpan langkah terakhir (from, to, piece)
  }

  movePiece(from, to) {
    const piece = this.board.getPiece(from);
    const target = this.board.getPiece(to);

    if (!piece) return { error: 'Tidak ada bidak di posisi itu.' };
    if (piece.color !== this.currentPlayer) {
      return { error: `Ini giliran ${this.currentPlayer}.` };
    }
    if (!piece.canMove(from, to, this.board.grid, this)) {
      return { error: `Langkah tidak valid untuk ${piece.symbol}` };
    }

    // Simulasikan gerakan untuk cek self-check
    const capturedEnPassant = this.checkEnPassantCapture(piece, from, to);

    this.board.grid[to[0]][to[1]] = piece;
    this.board.grid[from[0]][from[1]] = null;

    if (capturedEnPassant) {
      this.board.grid[capturedEnPassant.pos[0]][capturedEnPassant.pos[1]] = null;
    }

    // cek skak
    if (isCheck(this.currentPlayer, this.board, this)) {
      // rollback
      this.board.grid[from[0]][from[1]] = piece;
      this.board.grid[to[0]][to[1]] = target;
      if (capturedEnPassant) {
        this.board.grid[capturedEnPassant.pos[0]][capturedEnPassant.pos[1]] = capturedEnPassant.piece;
      }
      return { error: 'Gerakan ini akan menyebabkan raja Anda menjadi skak.' };
    }

    // Promosi pion
    let promotionResult = null;
    if (piece.type === 'Pawn') {
      const lastRow = piece.color === 'white' ? 0 : 7;
      if (to[0] === lastRow) {
        const promotedPiece = new Queen(piece.color);
        this.board.setPiece(to, promotedPiece);
        promotionResult = promotedPiece;
      }
    }

    // Update giliran dan lastMove
    this.currentPlayer = this.opponentColor();
    this.lastMove = { from, to, piece };

    const result = {
      piece,
      capture: target || null,
      promotion: !!promotionResult,
      promotedTo: promotionResult
    };

    return result;
  }

  checkEnPassantCapture(piece, from, to) {
    if (piece.type !== 'Pawn') return null;

    const direction = piece.color === 'white' ? -1 : 1;
    const diffRow = to[0] - from[0];
    const diffCol = to[1] - from[1];

    if (
      Math.abs(diffCol) === 1 &&
      diffRow === direction &&
      !this.board.getPiece(to) &&
      this.lastMove &&
      this.lastMove.piece.type === 'Pawn' &&
      this.lastMove.piece.color !== piece.color &&
      Math.abs(this.lastMove.to[0] - this.lastMove.from[0]) === 2 &&
      this.lastMove.to[0] === from[0] &&
      this.lastMove.to[1] === to[1]
    ) {
      const capturedPawnPos = [this.lastMove.to[0], this.lastMove.to[1]];
      const capturedPawn = this.board.getPiece(capturedPawnPos);
      return { pos: capturedPawnPos, piece: capturedPawn };
    }

    return null;
  }

  opponentColor() {
    return this.currentPlayer === 'white' ? 'black' : 'white';
  }
}
