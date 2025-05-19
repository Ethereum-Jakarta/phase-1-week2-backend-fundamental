export function parsePosition(pos) {
  const files = 'abcdefgh';
  const col = files.indexOf(pos[0]);
  const row = 8 - parseInt(pos[1]);
  return [row, col];
}

export function isValidInput(from, to) {
  const allValid = (pos) => {
    const files = 'abcdefgh';
    const ranks = '12345678';
    return files.includes(pos[0]) && ranks.includes(pos[1]);
  };
  return allValid(from) && allValid(to);
}

export function findKingPosition(color, grid) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = grid[row][col];
      if (piece && piece.type === 'King' && piece.color === color) {
        return [row, col];
      }
    }
  }
  return null; // Jika raja tidak ditemukan
}

export function pathIsClear(from, to, grid) {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;

  const rowStep = Math.sign(toRow - fromRow);
  const colStep = Math.sign(toCol - fromCol);

  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;

  // Periksa semua sel di sepanjang jalur kecuali awal dan akhir
  while (currentRow !== toRow || currentCol !== toCol) {
    if (grid[currentRow][currentCol] !== null) {
      return false;
    }
    currentRow += rowStep;
    currentCol += colStep;
  }

  return true;
}



