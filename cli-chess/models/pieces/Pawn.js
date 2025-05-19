import { Piece } from './Piece.js'

export class Pawn extends Piece {
  constructor(color) {
    super(color, color === 'white' ? '♙' : '♟');
    this.type = 'Pawn';
  }

  canMove(from, to, board, game) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    const direction = this.color === 'white' ? -1 : 1;
    const startRow = this.color === 'white' ? 6 : 1;
    const diffRow = toRow - fromRow;
    const diffCol = toCol - fromCol;

    // Maju 1 langkah
    if (diffCol === 0 && diffRow === direction && !board[toRow][toCol]) {
      return true;
    }

    // Maju 2 langkah dari baris awal
    if (
      fromRow === startRow &&
      diffCol === 0 &&
      diffRow === 2 * direction &&
      !board[fromRow + direction][fromCol] &&
      !board[toRow][toCol]
    ) {
      return true;
    }

    // Menyerang diagonal biasa
    const target = board[toRow][toCol];
    if (
      Math.abs(diffCol) === 1 &&
      diffRow === direction &&
      target &&
      this.isEnemy(target)
    ) {
      return true;
    }

    // En Passant
    if (
      Math.abs(diffCol) === 1 &&
      diffRow === direction &&
      !target && // kotak tujuan kosong
      game.lastMove &&
      game.lastMove.piece.type === 'Pawn' &&
      game.lastMove.piece.color !== this.color &&
      Math.abs(game.lastMove.to[0] - game.lastMove.from[0]) === 2 && // pion lawan double step
      game.lastMove.to[0] === fromRow && // baris sama dengan pion kita (di samping)
      game.lastMove.to[1] === toCol // kolom pion lawan sesuai kolom target en passant
    ) {
      return true;
    }

    return false;
  }

}