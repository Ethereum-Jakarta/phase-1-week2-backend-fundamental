export const initialBoard = [
  ["♜","♞","♝","♛","♚","♝","♞","♜"],
  ["♟","♟","♟","♟","♟","♟","♟","♟"],
  [" "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "],
  [" "," "," "," "," "," "," "," "],
  ["♙","♙","♙","♙","♙","♙","♙","♙"],
  ["♖","♘","♗","♕","♔","♗","♘","♖"]
];

export const fileToCol = { a:0, b:1, c:2, d:3, e:4, f:5, g:6, h:7 };

export function parsePosition(pos) {
  return [
    8 - parseInt(pos[1]),
    fileToCol[pos[0].toLowerCase()]
  ];
}

export function printBoard(board) {
  console.log("\n    a   b   c   d   e   f   g   h ");
  console.log("  ---------------------------------");

  for (let row = 0; row < 8; row++) {
    let line = `${8-row} |`;
    for (let col = 0; col < 8; col++) {
      line += ` ${board[row][col]} |`;
    }
    console.log(line + ` ${8-row}`);
    console.log("  ---------------------------------");
  }

  console.log("    a   b   c   d   e   f   g   h \n");
}
