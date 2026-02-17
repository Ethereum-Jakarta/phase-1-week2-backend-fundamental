// boardInitializer.js
export function initializeBoard() {
    const board = Array(8).fill(null).map(() => Array(8).fill(null));

    // White pieces (filled symbols)
    board[0][0] = { type: 'rook', color: 'white', symbol: '♜', moved: false };
    board[0][1] = { type: 'knight', color: 'white', symbol: '♞', moved: false };
    board[0][2] = { type: 'bishop', color: 'white', symbol: '♝', moved: false };
    board[0][3] = { type: 'queen', color: 'white', symbol: '♛', moved: false };
    board[0][4] = { type: 'king', color: 'white', symbol: '♚', moved: false };
    board[0][5] = { type: 'bishop', color: 'white', symbol: '♝', moved: false };
    board[0][6] = { type: 'knight', color: 'white', symbol: '♞', moved: false };
    board[0][7] = { type: 'rook', color: 'white', symbol: '♜', moved: false };

    for (let i = 0; i < 8; i++) {
        board[1][i] = { type: 'pawn', color: 'white', symbol: '♟', moved: false };
    }

    // Black pieces (outlined symbols)
    board[7][0] = { type: 'rook', color: 'black', symbol: '♖', moved: false };
    board[7][1] = { type: 'knight', color: 'black', symbol: '♘', moved: false };
    board[7][2] = { type: 'bishop', color: 'black', symbol: '♗', moved: false };
    board[7][3] = { type: 'queen', color: 'black', symbol: '♕', moved: false };
    board[7][4] = { type: 'king', color: 'black', symbol: '♔', moved: false };
    board[7][5] = { type: 'bishop', color: 'black', symbol: '♗', moved: false };
    board[7][6] = { type: 'knight', color: 'black', symbol: '♘', moved: false };
    board[7][7] = { type: 'rook', color: 'black', symbol: '♖', moved: false };

    for (let i = 0; i < 8; i++) {
        board[6][i] = { type: 'pawn', color: 'black', symbol: '♙', moved: false };
    }

    return board;
}