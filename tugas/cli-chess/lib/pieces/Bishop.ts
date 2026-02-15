import { PieceName, Side } from "../constants";
import Piece from "./Abstraction";

export default class Bishop extends Piece {
  public name = PieceName.Bishop;

  public *posibleMoves(x: number, y: number) {
    let upright = true;
    let upleft = true;
    let downleft = true;
    let downright = true;
    let inc = 1;
    while(upright || upleft || downleft || downright) {
      if (upright) {
        const piece = this.board.select([x, y], inc, inc);
        if (!piece) upright = false;
        else {
          if (piece.name !== PieceName.Empty) upright = false;
          if (piece.side !== this.side) yield [inc, inc];
        }
      }
      if (upleft) {
        const piece = this.board.select([x, y], -inc, inc);
        if (!piece) upleft = false;
        else {
          if (piece.name !== PieceName.Empty) upleft = false;
          if (piece.side !== this.side) yield [-inc, inc];
        }
      }
      if (downright) {
        const piece = this.board.select([x, y], inc, -inc);
        if (!piece) downright = false;
        else {
          if (piece.name !== PieceName.Empty) downright = false;
          if (piece.side !== this.side) yield [inc, -inc];
        }
      }
      if (downleft) {
        const piece = this.board.select([x, y], -inc, -inc);
        if (!piece) downleft = false;
        else {
          if (piece.name !== PieceName.Empty) downleft = false;
          if (piece.side !== this.side) yield [-inc, -inc];
        }
      }
      inc++;
    }
  }
}
