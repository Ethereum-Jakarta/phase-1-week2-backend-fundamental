// moveExecution.js
export function makeMove(board, from, to) {
    const piece = board[from.row][from.col];
    board[to.row][to.col] = piece;
    board[from.row][from.col] = null;

    if (piece) {
        piece.moved = true;
    }
}