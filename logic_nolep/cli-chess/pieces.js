export const WHITE = "white";
export const BLACK = "black";

export function getColor(piece) {
  if ("♙♖♘♗♕♔".includes(piece)) return WHITE;
  if ("♟♜♞♝♛♚".includes(piece)) return BLACK;
  return null;
}

export function isEmpty(square) {
  return square === " ";
}
