export class Piece {
  constructor(color, symbol) {
    this.color = color;
    this.symbol = symbol;
  }

  isEnemy(piece) {
    return piece && piece.color !== this.color;
  }
}
