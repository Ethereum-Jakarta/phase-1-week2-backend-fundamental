export const enum UnicodePiece {
  KingWhite = "\u2654 ",
  QueenWhite = "\u2655 ",
  RookWhite = "\u2656 ",
  BishopWhite = "\u2657 ",
  KnightWhite = "\u2658 ",
  PawnWhite = "\u2659 ",
  KingBlack = "\u265a ",
  QueenBlack = "\u265b ",
  RookBlack = "\u265c ",
  BishopBlack = "\u265d ",
  KnightBlack = "\u265e ",
  PawnBlack = "\u265f ",
  NotPlaced = "  ",
}

export const enum PieceName {
  Empty,
  King,
  Queen,
  Rook,
  Bishop,
  Knight,
  Pawn,
}

export const enum Side {
  White, Black, NoSide,
}

export const enum Color {
  FgPrimary = "#000000",
  BgColOdd = "#D8AE7E",
  BgColEven = "#F8C794",
  BgCheckmate = "#FF8A8A",
}

export const enum BoxDraw {
  LightHorizontal = "\u2500",
  LightVertical = "\u2502",
}
