// moveValidation.js
import { parsePosition } from './utils.js';

export function isValidMove(board, currentPlayer, fromPos, toPos, isValidPieceMoveFn, copyBoardFn, isInCheckFn, makeMoveFn) {
    const from = parsePosition(fromPos);
    const to = parsePosition(toPos);

    if (!from || !to) {
        return { valid: false, error: 'Invalid position format. Use format like a2, e4, etc.' };
    }

    const piece = board[from.row][from.col];
    if (!piece) {
        return { valid: false, error: 'No piece at the starting position.' };
    }

    if (piece.color !== currentPlayer) {
        return { valid: false, error: `It's ${currentPlayer}'s turn.` };
    }

    const targetPiece = board[to.row][to.col];
    if (targetPiece && targetPiece.color === piece.color) {
        return { valid: false, error: 'Cannot capture your own piece.' };
    }

    if (!isValidPieceMoveFn(piece, from, to)) {
        return { valid: false, error: `Invalid move for ${piece.type}.` };
    }

    // Check if the move would put own king in check
    const tempBoard = copyBoardFn(board);
    makeMoveFn(board, from, to);
    const inCheck = isInCheckFn(currentPlayer);
    // Restore the board after check
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            board[r][c] = tempBoard[r][c];
        }
    }

    if (inCheck) {
        return { valid: false, error: 'Move would put your king in check.' };
    }

    return { valid: true };
}