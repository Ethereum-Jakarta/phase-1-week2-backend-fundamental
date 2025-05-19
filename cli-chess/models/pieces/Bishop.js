import { Piece } from './Piece.js';

export class Bishop extends Piece {
  constructor(color) {
    super(color, color === 'white' ? '♗' : '♝');
    this.type = 'Bishop';
  }

  canMove(from, to, board) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);

    if (rowDiff !== colDiff) return false; // Harus diagonal

    const stepRow = toRow > fromRow ? 1 : -1;
    const stepCol = toCol > fromCol ? 1 : -1;

    let row = fromRow + stepRow;
    let col = fromCol + stepCol;

    while (row !== toRow || col !== toCol) {
      if (board[row][col]) return false; // Ada penghalang
      row += stepRow;
      col += stepCol;
    }

    const target = board[toRow][toCol];
    return !target || this.isEnemy(target);
  }

  isEnemy(piece) {
    return piece && piece.color !== this.color;
  }
}
