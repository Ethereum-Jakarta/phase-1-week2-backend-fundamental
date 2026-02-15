export function parser(input) {
  let [col, row] = input;
  col = col.charCodeAt(0) - "a".charCodeAt(0);
  row = 8 - Number(row);

  return { row: row, col: col };
}
