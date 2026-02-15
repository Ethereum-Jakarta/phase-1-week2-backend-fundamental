import { PieceName } from "../constants";
import Piece from "./Abstraction";

export default class King extends Piece {
  public name = PieceName.King;

  public *posibleMoves(_: number, __: number) {
    yield [-1, 0];
    yield [1, 0];
    yield [0, 1];
    yield [0, -1];
    yield [-1, 1];
    yield [1, 1];
    yield [-1, -1];
    yield [1, -1];
  }
}
