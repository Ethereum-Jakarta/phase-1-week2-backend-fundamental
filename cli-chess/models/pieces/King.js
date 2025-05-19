import { Piece } from './Piece.js';

export class King extends Piece {
  constructor(color) {
    super(color, color === 'white' ? '♔' : '♚');
    this.type = 'King';
  }

  canMove(from, to, board) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);

    // Hanya boleh pindah 1 kotak ke segala arah
    if (rowDiff <= 1 && colDiff <= 1) {
      const target = board[toRow][toCol];
      return !target || this.isEnemy(target);
    }

    return false;
  }

  isEnemy(piece) {
    return piece && piece.color !== this.color;
  }
}
