// Queen.js
import { Piece } from './Piece.js';
import { Bishop } from './Bishop.js';
import { Rook } from './Rook.js';

export class Queen extends Piece {
  constructor(color) {
    super(color, color === 'white' ? '♕' : '♛');
    this.type = 'Queen';
  }

  canMove(from, to, board) {
    const bishop = new Bishop(this.color);
    const rook = new Rook(this.color);
    return bishop.canMove(from, to, board) || rook.canMove(from, to, board);
  }

  isEnemy(piece) {
    return piece && piece.color !== this.color;
  }
}
