import { PieceName } from "../constants";
import Piece from "./Abstraction";

export default class Rook extends Piece {
  public name = PieceName.Rook;

  public *posibleMoves(x: number, y: number) {
    let up = true;
    let down = true;
    let left = true;
    let right = true;
    let inc = 1;
    while(up || down || left || right) {
      if (up) {
        const piece = this.board.select([x, y], 0, inc);
        if (!piece) up = false;
        else {
          if (piece.name !== PieceName.Empty) up = false;
          if (piece.side !== this.side) yield [0, inc];
        }
      }
      if (down) {
        const piece = this.board.select([x, y], 0, -inc);
        if (!piece) down = false;
        else {
          if (piece.name !== PieceName.Empty) down = false;
          if (piece.side !== this.side) yield [0, -inc];
        }
      }
      if (right) {
        const piece = this.board.select([x, y], inc, 0);
        if (!piece) right = false;
        else {
          if (piece.name !== PieceName.Empty) right = false;
          if (piece.side !== this.side) yield [inc, 0];
        }
      }
      if (left) {
        const piece = this.board.select([x, y], -inc, 0);
        if (!piece) left = false;
        else {
          if (piece.name !== PieceName.Empty) left = false;
          if (piece.side !== this.side) yield [-inc, 0];
        }
      }
      inc++;
    }
  }
}
