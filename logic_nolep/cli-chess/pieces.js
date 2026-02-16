// arsitektur pieces
// pawn
function isPawn(piece) {
    return piece === '♙' || piece === '♟';
}

// rook
function isRook(piece) {
    return piece === '♖' || piece === '♜';
}

// knight
function isKnight(piece) {
    return piece === '♘' || piece === '♞';
}

// bishop
function isBishop(piece) {
    return piece === '♗' || piece === '♝';
}

// queen
function isQueen(piece) {
    return piece === '♕' || piece === '♛';    
}

// kink
function isKing(piece) {
    return piece === '♔' || piece === '♚';
}

// arsitektur color piece
function isWhite(piece) {
    return '♙♖♘♗♕♔'.includes(piece);
}

function isBlack(piece) {
    return '♟♜♞♝♛♚'.includes(piece);
}

function isSameColor(p1, p2) {
    if (p2 === ' ') return false; 
    return (isWhite(p1) && isWhite(p2)) || (isBlack(p1) && isBlack(p2));
}

// blocking path
function isPathClear(from, to, board) {
    const rowStep = Math.sign(to.row - from.row);
    const colStep = Math.sign(to.col - from.col);

    let r = from.row + rowStep;
    let c = from.col + colStep;

    while (r !== to.row || c !== to.col) {
        if (board[r][c] !== ' ') return false;
        r += rowStep;
        c += colStep;
    }
    return true;
}

// rules tiap pieces
// pawn rules
function canPawnMove(from, to, board) {
    const piece = board[from.row][from.col];
    const target = board[to.row][to.col];

    if (!isPawn(piece)) return false;
    if (isSameColor(piece, target)) return false; 

    const rowDiff = to.row - from.row;
    const colDiff = to.col - from.col;

    // white
    if (piece === '♙') {
        if (colDiff === 0 && rowDiff === -1 && target === ' ') return true;
        if (Math.abs(colDiff) === 1 && rowDiff === -1 && target !== ' ') return true;
    }
    // white 2 langkah
    if (piece === '♙' && from.row === 6 && colDiff === 0 && rowDiff === -2 && board[5][from.col] === ' ' && target === ' ') return true;

    // black
    if (piece === '♟') {
        if (colDiff === 0 && rowDiff === 1 && target === ' ') return true;
        if (Math.abs(colDiff) === 1 && rowDiff === 1 && target !== ' ') return true;
    }
    // black 2 langkah
    if (piece === '♟' && from.row === 1 && colDiff === 0 && rowDiff === 2 && board[2][from.col] === ' ' && target === ' ') return true;

    return false;
}

// rook rules
function canRookMove(from, to, board) {
    const piece = board[from.row][from.col];
    const target = board[to.row][to.col];

    if (!isRook(piece)) return false;
    if (isSameColor(piece, target)) return false;

    if (!(from.row === to.row || from.col === to.col)) return false;
    return isPathClear(from, to, board);
}

// knight rules
function canKnightMove(from, to, board) {
    const piece = board[from.row][from.col];
    const target = board[to.row][to.col];

    if (!isKnight(piece)) return false;
    if (isSameColor(piece, target)) return false;

    const r = Math.abs(from.row - to.row);
    const c = Math.abs(from.col - to.col);

    return (r === 2 && c === 1) || (r === 1 && c === 2);
}

// bishop rules
function canBishopMove(from, to, board) {
    const piece = board[from.row][from.col];
    const target = board[to.row][to.col];

    if (!isBishop(piece)) return false;
    if (isSameColor(piece, target)) return false;

    if (Math.abs(from.row - to.row) !== Math.abs(from.col - to.col)) return false;
    return isPathClear(from, to, board);
}

// queen rules
function canQueenMove(from, to, board) {
    const piece = board[from.row][from.col];
    const target = board[to.row][to.col];

    if (!isQueen(piece)) return false;
    if (isSameColor(piece, target)) return false;

    const straight = from.row === to.row || from.col === to.col;
    const diagonal = Math.abs(from.row - to.row) === Math.abs(from.col - to.col);
    if (!straight && !diagonal) return false;
    return isPathClear(from, to, board);
}

// king rules
function canKingMove(from, to, board) {
    const piece = board[from.row][from.col];
    const target = board[to.row][to.col];

    if (!isKing(piece)) return false;
    if (isSameColor(piece, target)) return false;

    const r = Math.abs(from.row - to.row);
    const c = Math.abs(from.col - to.col);

    return r <= 1 && c <= 1;
}


export { canPawnMove, canRookMove, canKnightMove, canBishopMove, canQueenMove, canKingMove };
export { isWhite, isBlack };
export { isPathClear };