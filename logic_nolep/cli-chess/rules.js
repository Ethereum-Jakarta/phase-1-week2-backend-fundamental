import { WHITE, BLACK, getColor } from "./pieces.js";

export function isValidMove(board, from, to, piece, color) {
  const [fr, fc] = from;
  const [tr, tc] = to;

  const dr = tr - fr;
  const dc = tc - fc;

  const target = board[tr][tc];
  const targetColor = getColor(target);

  // tidak boleh makan teman sendiri
  if (targetColor === color) return false;

  switch (piece) {
    case "♙": case "♟":
      return validatePawn(board, from, to, color);
    case "♖": case "♜":
      return validateRook(board, from, to);
    case "♘": case "♞":
      return validateKnight(dr, dc);
    case "♗": case "♝":
      return validateBishop(board, from, to);
    case "♕": case "♛":
      return validateQueen(board, from, to);
    case "♔": case "♚":
      return validateKing(dr, dc);
  }

  return false;
}

// ------------------- RULES ---------------------

function validatePawn(board, [fr, fc], [tr, tc], color) {
  const direction = color === WHITE ? -1 : 1;
  const startRow = color === WHITE ? 6 : 1;

  const dr = tr - fr;
  const dc = tc - fc;
  const target = board[tr][tc];

  // maju 1 langkah
  if (dc === 0 && dr === direction && target === " ") return true;

  // maju 2 langkah dari posisi awal
  if (
    fr === startRow &&
    dc === 0 &&
    dr === 2 * direction &&
    board[fr + direction][fc] === " " &&
    target === " "
  ) {
    return true;
  }

  // makan bidak lawan
  if (Math.abs(dc) === 1 && dr === direction && target !== " ") return true;

  return false;
}

function validateRook(board, [fr, fc], [tr, tc]) {
  if (fr !== tr && fc !== tc) return false;
  return pathClear(board, fr, fc, tr, tc);
}

function validateKnight(dr, dc) {
  return (
    (Math.abs(dr) === 2 && Math.abs(dc) === 1) ||
    (Math.abs(dr) === 1 && Math.abs(dc) === 2)
  );
}

function validateBishop(board, [fr, fc], [tr, tc]) {
  if (Math.abs(tr - fr) !== Math.abs(tc - fc)) return false;
  return pathClear(board, fr, fc, tr, tc);
}

function validateQueen(board, from, to) {
  const [fr, fc] = from;
  const [tr, tc] = to;

  const dr = tr - fr;
  const dc = tc - fc;

  if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
    return pathClear(board, fr, fc, tr, tc);
  }

  return false;
}

function validateKing(dr, dc) {
  return Math.abs(dr) <= 1 && Math.abs(dc) <= 1;
}

function pathClear(board, fr, fc, tr, tc) {
  const dr = tr - fr;
  const dc = tc - fc;

  const rStep = dr === 0 ? 0 : dr / Math.abs(dr);
  const cStep = dc === 0 ? 0 : dc / Math.abs(dc);

  let r = fr + rStep;
  let c = fc + cStep;

  while (r !== tr || c !== tc) {
    if (board[r][c] !== " ") return false;
    r += rStep;
    c += cStep;
  }

  return true;
}
