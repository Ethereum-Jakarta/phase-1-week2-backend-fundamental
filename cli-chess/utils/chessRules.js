import { findKingPosition } from "./helpers.js";

export function isCheckmate(color, board, game) {
  // Jika raja sedang skak dan tidak ada langkah legal, maka skakmat
  return isCheck(color, board, game) && !hasLegalMoves(color, board, game);
}

// Mengecek apakah raja warna tertentu sedang skak
export function isCheck(color, board, game) {
  const kingPos = findKingPosition(color, board.grid);
  if (!kingPos) return false;

  // Periksa semua bidak lawan
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board.grid[row][col];
      if (piece && piece.color !== color) {
        const from = [row, col];
        const to = kingPos;
        // Periksa apakah bidak lawan bisa menyerang raja
        if (piece.canMove(from, to, board.grid, game)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Mengecek apakah pemain masih memiliki langkah sah
export function hasLegalMoves(color, board, game) {
  for (let fromRow = 0; fromRow < 8; fromRow++) {
    for (let fromCol = 0; fromCol < 8; fromCol++) {
      const piece = board.grid[fromRow][fromCol];
      if (piece && piece.color === color) {
        for (let toRow = 0; toRow < 8; toRow++) {
          for (let toCol = 0; toCol < 8; toCol++) {
            if ((fromRow !== toRow || fromCol !== toCol) && piece.canMove([fromRow, fromCol], [toRow, toCol], board.grid, game)) {
              // Simulasi langkah pada salinan grid
              const simulatedGrid = cloneGrid(board.grid);
              simulatedGrid[toRow][toCol] = piece;
              simulatedGrid[fromRow][fromCol] = null;

              // Cek apakah setelah langkah, raja masih skak
              if (!isCheck(color, { grid: simulatedGrid }, game)) {
                return true;
              }
            }
          }
        }
      }
    }
  }
  return false;
}

function cloneGrid(grid) {
  return grid.map(row => row.slice());
}


