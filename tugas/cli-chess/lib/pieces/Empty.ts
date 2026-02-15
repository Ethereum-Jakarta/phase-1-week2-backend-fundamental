import type Board from "../Board";
import { PieceName, Side } from "../constants";
import Piece from "./Abstraction";

export default class Empty extends Piece {
  public name = PieceName.Empty;

  public constructor(board: Board) {
    super(Side.NoSide, board);
  }

  public *posibleMoves(_: number, __: number) {
    return [];
  }
}
