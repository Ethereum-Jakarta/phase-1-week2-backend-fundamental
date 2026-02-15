import { PieceName } from "../constants";
import Piece from "./Abstraction";

export default class Pawn extends Piece {
  public name = PieceName.Pawn;

  public *posibleMoves(x: number, y: number) {
    const board = this.board.current;
    if (board[y + this.abs(1)]?.[x]?.name === PieceName.Empty) yield [0, this.abs(1)] as [x: number, y: number];
    if (board[y + this.abs(1)]?.[x + 1]?.name !== PieceName.Empty) yield [1, this.abs(1)];
    if (board[y + this.abs(1)]?.[x - 1]?.name !== PieceName.Empty) yield[-1, this.abs(1)];
    if (this.firstMove && board[y + this.abs(2)]?.[x]?.name === PieceName.Empty) yield [0, this.abs(2)];
  }
}
