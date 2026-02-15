import chalk from "chalk";
import type Board from "../Board";
import { UnicodePiece, PieceName, Side, Color } from "../constants";

export default abstract class Piece {
  public abstract name: PieceName;

  public checkmate = false;

  public firstMove = true;

  public abstract posibleMoves(posX: number, posY: number): IterableIterator<number[]>;

  public constructor(
    public side: Side,
    protected board: Board,
  ) {}

  public get unicode() {
    switch (this.side) {
      case Side.White: return this.unicodeWhitePiece;
      case Side.Black: return this.unicodeBlackPiece;
      case Side.NoSide: return UnicodePiece.NotPlaced;
      default: throw ReferenceError("Forbidden Side!");
    }
  }

  private get unicodeWhitePiece() {
    switch (this.name) {
      case PieceName.Empty: return UnicodePiece.NotPlaced;
      case PieceName.King: return UnicodePiece.KingWhite;
      case PieceName.Queen: return UnicodePiece.QueenWhite;
      case PieceName.Rook: return UnicodePiece.RookWhite;
      case PieceName.Bishop: return UnicodePiece.BishopWhite;
      case PieceName.Knight: return UnicodePiece.KnightWhite;
      case PieceName.Pawn: return UnicodePiece.PawnWhite;
      default: throw ReferenceError("Forbidden Piece!");
    }
  }

  private get unicodeBlackPiece() {
    switch (this.name) {
      case PieceName.Empty: return UnicodePiece.NotPlaced;
      case PieceName.King: return UnicodePiece.KingBlack;
      case PieceName.Queen: return UnicodePiece.QueenBlack;
      case PieceName.Rook: return UnicodePiece.RookBlack;
      case PieceName.Bishop: return UnicodePiece.BishopBlack;
      case PieceName.Knight: return UnicodePiece.KnightBlack;
      case PieceName.Pawn: return UnicodePiece.PawnBlack;
      default: throw ReferenceError("Forbidden Piece!");
    }
  }

  private getBgColor(odd: boolean) {
    switch (true) {
      case this.checkmate: return Color.BgCheckmate;
      case odd: return Color.BgColOdd;
      default: return Color.BgColEven;
    }
  }

  public print(odd: boolean) {
    return chalk
      .bgHex(this.getBgColor(odd))
      .hex(Color.FgPrimary)(this.unicode);
  }

  protected abs(move: number) {
    return this.side === Side.White ? (move * -1) : move;
  }

  public validateMove(fromX: number, fromY: number, toX: number, toY: number) {
    for (const [x, y] of this.posibleMoves(fromX, fromY)) {
      if ((fromX + x) === toX && (fromY + y) === toY) return true;
    }
    return false;
  }

  public checkmateLevel(posX: number, posY: number) {
    if (this.name !== PieceName.King) throw ReferenceError("Forbidden Piece");
    const opponentSide = this.side === Side.White ? Side.Black : Side.White;
    const kingMoves = new Set<string>();
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        if (!(!x && !y)) kingMoves.add(`${posX + x}_${posY + y}`);

    for (let y = 0; y < this.board.current.length; y++) {
      for (let x = 0; x < this.board.current[y].length; x++) {
        const piece = this.board.current[y][x];
        if (piece.side !== opponentSide) continue;
        for (const [moveX, moveY] of piece.posibleMoves(x, y)) {
          const movement = `${moveX + x}_${moveY + y}`;
          if (kingMoves.has(movement) 
            && this.board.current[moveY + y][moveX + x].name === PieceName.Empty) {
            kingMoves.delete(movement);
            break;
          }
        }
      }
    }

    this.checkmate = kingMoves.size < 8;

    return kingMoves.size;
  }
}
