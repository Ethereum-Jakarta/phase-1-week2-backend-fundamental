import { PieceName } from "../constants";
import Piece from "./Abstraction";
import Bishop from "./Bishop";
import Rook from "./Rook";

export default class Queen extends Piece {
  public name = PieceName.Queen;

  public *posibleMoves(x: number, y: number) {
    yield *Rook.prototype.posibleMoves.call(this, x, y);
    yield *Bishop.prototype.posibleMoves.call(this, x, y);
  }
}
