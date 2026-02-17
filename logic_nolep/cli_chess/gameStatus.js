// gameStatus.js
import { copyBoard } from './utils.js';
import { makeMove } from './moveExecution.js';

export function findKing(board, color) {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece && piece.type === 'king' && piece.color === color) {
                return { row, col };
            }
        }
    }
    return null;
}

export function isInCheck(board, color, isValidPieceMoveFn) {
    const king = findKing(board, color);
    if (!king) return false;

    const opponent = color === 'white' ? 'black' : 'white';

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece && piece.color === opponent) {
                if (isValidPieceMoveFn(piece, { row, col }, king)) {
                    return true;
                }
            }
        }
    }

    return false;
}

export function isCheckmate(board, color, isInCheckFn, isValidPieceMoveFn, copyBoardFn, makeMoveFn) {
    if (!isInCheckFn(color)) return false;

    for (let fromRow = 0; fromRow < 8; fromRow++) {
        for (let fromCol = 0; fromCol < 8; fromCol++) {
            const piece = board[fromRow][fromCol];
            if (piece && piece.color === color) {
                for (let toRow = 0; toRow < 8; toRow++) {
                    for (let toCol = 0; toCol < 8; toCol++) {
                        const from = { row: fromRow, col: fromCol };
                        const to = { row: toRow, col: toCol };

                        const tempBoard = copyBoardFn(board);

                        if (isValidPieceMoveFn(piece, from, to)) {
                            const targetPiece = board[toRow][toCol];
                            if (!targetPiece || targetPiece.color !== color) {
                                makeMoveFn(board, from, to);

                                const stillInCheck = isInCheckFn(color);

                                for (let r = 0; r < 8; r++) {
                                    for (let c = 0; c < 8; c++) {
                                        board[r][c] = tempBoard[r][c];
                                    }
                                }

                                if (!stillInCheck) {
                                    return false;
                                }
                            }
                        } else {
                            for (let r = 0; r < 8; r++) {
                                for (let c = 0; c < 8; c++) {
                                    board[r][c] = tempBoard[r][c];
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return true;
}