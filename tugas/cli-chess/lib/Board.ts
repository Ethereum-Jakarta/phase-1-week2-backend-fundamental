import { BoxDraw, PieceName, Side } from "./constants";
import type Piece from "./pieces/Abstraction";
import Bishop from "./pieces/Bishop";
import Empty from "./pieces/Empty";
import King from "./pieces/King";
import Knight from "./pieces/Knight";
import Pawn from "./pieces/Pawn";
import Queen from "./pieces/Queen";
import Rook from "./pieces/Rook";

const coordinateX = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const coordinateY = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

export type Coordinate
= `${typeof coordinateX[number]}${typeof coordinateY[number]}` 
| `${typeof coordinateY[number]}${typeof coordinateX[number]}`
| `${typeof coordinateY[number]}${Uppercase<typeof coordinateX[number]>}`
| `${typeof coordinateX[number]}${Uppercase<typeof coordinateY[number]>}`;

export default class Board {
  public current: Piece[][] = [];

  public KingBlack = new King(Side.Black, this);
  public KingWhite = new King(Side.White, this);

  public KingBlackPos = [4, 0] as [number, number];
  public KingWhitePos = [4, 7] as [number, number];

  public constructor() {
    this.initialize();
  }

  private initialize() {
    for (let y = 0; y < 8; y++) {
      if (y === 0) {
        this.current[y] = [
          new Rook(Side.Black, this),
          new Knight(Side.Black, this),
          new Bishop(Side.Black, this),
          new Queen(Side.Black, this),
          this.KingBlack,
          new Bishop(Side.Black, this),
          new Knight(Side.Black, this),
          new Rook(Side.Black, this),
        ];
        continue;
      }
      if (y === 7) {
        this.current[y] = [
          new Rook(Side.White, this),
          new Knight(Side.White, this),
          new Bishop(Side.White, this),
          new Queen(Side.White, this),
          this.KingWhite,
          new Bishop(Side.White, this),
          new Knight(Side.White, this),
          new Rook(Side.White, this),
        ];
        continue;
      }
      this.current[y] ??= [];
      for (let x = 0; x < 8; x++) {
        let piece: Piece;
        switch (y) {
          case 1: piece = new Pawn(Side.Black, this); break;
          case 6: piece = new Pawn(Side.White, this); break;
          default: piece = new Empty(this); break;
        }
        this.current[y][x] ??= piece;
      }
    }
  }

  public print() {
    console.log(" \u256d" + "ABCDEFGH".split("").map(x => `${x}${BoxDraw.LightHorizontal}`).join("") + "\u256e ");
    this
      .current
      .forEach(
        (x, i) => console.log(
            `${i+1}${BoxDraw.LightVertical}` + 
            x.map((y, ii) => y.print(Boolean((i % 2) ? !(ii%2) : ii%2))).join("") +
            `${BoxDraw.LightVertical}${i+1}`
          )
      );
    console.log(" \u2570" + "ABCDEFGH".split("").map(x => `${BoxDraw.LightHorizontal}${x}`).join("") + "\u256f ");
  }

  private parseCoordinate([first, last]: string): [x: number, y: number] {
    let x = coordinateX.indexOf(first as any);
    let y = coordinateY.indexOf(last as any);
    if (x === -1) x = coordinateX.indexOf(last as any);
    if (y === -1) y = coordinateY.indexOf(first as any);
    if (x === -1 || y === -1) throw ReferenceError("Forbidden Coordinate");
    return [x, y];
  }

  public move(turn: boolean, from: Coordinate, to: Coordinate) {
    const [fromX, fromY] = this.parseCoordinate(from.toLowerCase());
    const [toX, toY] = this.parseCoordinate(to.toLowerCase());
    const pieceFrom = this.current[fromY][fromX];
    if (
      (pieceFrom.name === PieceName.Empty)
        || (turn && pieceFrom.side !== Side.White)
        || (!turn && pieceFrom.side !== Side.Black))
      throw ReferenceError("Forbidden Coordinate");
    if (!pieceFrom.validateMove(fromX, fromY, toX, toY)) throw ReferenceError("Forbidden Coordinate");
    pieceFrom.firstMove = false;
    const pieceTo = this.current[toY][toX];
    if (pieceTo.name !== PieceName.Empty) {
      if (pieceFrom.side === pieceTo.side) throw ReferenceError("Forbidden Coordinate");
      this.current[fromY][fromX] = new Empty(this);
      this.current[toY][toX] = pieceFrom;
      return pieceTo;
    } else {
      this.current[fromY][fromX] = pieceTo;
      this.current[toY][toX] = pieceFrom;
    }

    if (pieceFrom.name === PieceName.King) {
      if (pieceFrom.side === Side.White) this.KingWhitePos = [toX, toY];
      if (pieceFrom.side === Side.Black) this.KingBlackPos = [toX, toY];
    }
  }

  public select([initX, initY]: [number, number], x: number, y: number) {
    return this.current[initY + y]?.[initX + x] as undefined | Piece;
  }
}
