import { Piece } from './Piece.js';

export class Knight extends Piece {
  constructor(color) {
    super(color, color === 'white' ? '♘' : '♞');
    this.type = 'Knight';
  }

  canMove(from, to, board) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);

    if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
      const target = board[toRow][toCol];
      return !target || this.isEnemy(target);
    }

    return false;
  }

  isEnemy(piece) {
    return piece && piece.color !== this.color;
  }
}
