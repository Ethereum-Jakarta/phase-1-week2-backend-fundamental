import { Piece } from './Piece.js';
import { pathIsClear } from '../../utils/helpers.js';

export class Rook extends Piece {
  constructor(color) {
    super(color, color === 'white' ? '♖' : '♜');
    this.type = 'Rook';
  }

  canMove(from, to, board) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    // Harus bergerak horizontal atau vertikal
    if (fromRow !== toRow && fromCol !== toCol) return false;

    // Menentukan arah pergerakan
    const stepRow = toRow === fromRow ? 0 : (toRow > fromRow ? 1 : -1);
    const stepCol = toCol === fromCol ? 0 : (toCol > fromCol ? 1 : -1);

    // Perlu dicek jalurnya
    return pathIsClear(from, to, board) && 
          (!board[toRow][toCol] || this.isEnemy(board[toRow][toCol]));
  }

  isEnemy(piece) {
    return piece && piece.color !== this.color;
  }
}
