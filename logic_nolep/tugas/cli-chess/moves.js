function getPawnMoves(board, row, col, pawn) {
  const moves = [];
  const direction = pawn.color === "white" ? -1 : 1;

  const nextRow = row + direction;
  const target = board[nextRow][col];

  if (nextRow >= 0 && nextRow < 8 && target === null) {
    moves.push([nextRow, col]);

    const startRow = pawn.color === "white" ? 6 : 1;
    const twoStepsRow = row + direction * 2;

    if (row === startRow && board[twoStepsRow][col] === null) {
      moves.push([twoStepsRow, col]);
    }
  }

  const attackCols = [col - 1, col + 1];
  attackCols.forEach((attackCol) => {
    if (attackCol >= 0 && attackCol < 8) {
      const target = board[nextRow]?.[attackCol];
      if (target && target.color !== pawn.color) {
        moves.push([nextRow, attackCol]);
      }
    }
  });

  return moves;
}

function getRookMoves(board, row, col, rook) {
  const moves = getRBQMoves(board, row, col, rook);

  return moves;
}

function getBishopMoves(board, row, col, bishop) {
  const moves = getRBQMoves(board, row, col, bishop);

  return moves;
}

function getQueenMoves(board, row, col, queen) {
  const moves = getRBQMoves(board, row, col, queen);

  return moves;
}

function getKingMoves(board, row, col, king) {
  let moves = [];
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  for (const [dr, dc] of directions) {
    let r = row + dr;
    let c = col + dc;

    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
      const target = board[r][c];
      if (target === null) {
        moves.push([r, c]);
      } else {
        if (target.color !== king.color) {
          moves.push([r, c]);
        }
      }
    }
  }

  return moves;
}

function getRBQMoves(board, row, col, piece) {
  let moves = [];
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  let pieceDir = null;

  if (piece.type === "rook") {
    pieceDir = directions.slice(0, 4);
  } else if (piece.type === "bishop") {
    pieceDir = directions.slice(4);
  } else {
    pieceDir = directions;
  }

  for (const [dr, dc] of pieceDir) {
    let r = row + dr;
    let c = col + dc;

    while (r >= 0 && r < 8 && c >= 0 && c < 8) {
      const target = board[r][c];
      if (target === null) {
        moves.push([r, c]);
      } else {
        if (target.color !== piece.color) {
          moves.push([r, c]);
        }
        break;
      }

      r += dr;
      c += dc;
    }
  }

  return moves;
}

function getKnightMoves(board, row, col, knight) {
  let moves = [];
  let directions = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];
  for (const [dr, dc] of directions) {
    let r = row + dr;
    let c = col + dc;

    if (r >= 0 && r < 8 && c >= 0 && c < 8) {
      const target = board[r][c];
      if (target === null) {
        moves.push([r, c]);
      } else {
        if (target.color !== knight.color) {
          moves.push([r, c]);
        }
      }
    }
  }

  return moves;
}

export {
  getBishopMoves,
  getRookMoves,
  getQueenMoves,
  getPawnMoves,
  getKingMoves,
  getKnightMoves,
};
