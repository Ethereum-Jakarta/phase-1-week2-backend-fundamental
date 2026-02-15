import { PieceName } from "../constants";
import Piece from "./Abstraction";

export default class Knight extends Piece {
  public name = PieceName.Knight;

  public *posibleMoves(_: number, __: number) {
    yield [2, 1];
    yield [-2, 1];
    yield [1, 2];
    yield [-1, 2];
    yield [2, -1];
    yield [-2, -1];
    yield [1, -2];
    yield [-1, -2];
  }
}
