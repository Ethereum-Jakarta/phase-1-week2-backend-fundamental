import { createBoard } from "./board.js";
import { canPawnMove, canRookMove, canKnightMove, canBishopMove, canQueenMove, canKingMove } from './pieces.js';
import { isWhite, isBlack } from "./pieces.js";
import { isPathClear } from "./pieces.js";

// checkmate arsitektur
function findKing(board, color) {
    const kingChar = color === 'white' ? '♔' : '♚';

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if (board[r][c] === kingChar) return {row: r, col: c};
        }
    }
    return null;
}

function canAttack(piece, from, to, board) {
    if (piece === '♙') {
        return to.row === from.row - 1 && Math.abs(to.col - from.col) === 1;
    }
    if (piece === '♟') {
        return to.row === from.row + 1 && Math.abs(to.col - from.col) === 1;
    }
    if (piece === '♖' || piece === '♜') {
        return (from.row === to.row || from.col === to.col) && isPathClear(from, to, board);
    }
    if (piece === '♘' || piece === '♞') {
        return canKnightMove(from, to, board);
    }
    if (piece === '♗' || piece === '♝') {
        return (Math.abs(from.row - to.row) === Math.abs(from.col - to.col) && isPathClear(from, to, board));
    }
    if (piece === '♕' || piece === '♛') {
        const straight = from.row === to.row || from.col === to.col;
        const diagonal = Math.abs(from.row - to.row) === Math.abs(from.col - to.col);
        return straight || diagonal && isPathClear(from, to, board);
    }
    if (piece === '♔' || piece === '♚') {
        return Math.abs(from.row - to.row) <= 1 && Math.abs(from.col - to.col) <= 1;
    }
    return false;
}

function isKingInCheck(board, color) {
    const kingPos = findKing(board, color);
    const enemyColor = color === 'white' ? 'black' : 'white';

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece === ' ') continue;

            if ((enemyColor === 'white' && isWhite(piece))  || (enemyColor === 'black' && isBlack(piece))) {
                const from = {row: r, col: c};
                const to = kingPos;

                if ((isWhite(piece) || isBlack(piece)) && canAttack(piece, from, kingPos, board)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function cloneBoard(board) {
    return board.map(row => [...row]);
}

function hasAnyLegalMove(board, color) {
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece === ' ') continue;

            if ((color === 'white' && !isWhite(piece)) || (color === 'black' && !isBlack(piece))) continue;

            for (let tr = 0; tr < 8; tr++) {
                for (let tc = 0; tc < 8; tc++) {
                    const from = { row: r, col: c};
                    const to = { row: tr, col: tc};

                    let valid = false;
                    if (piece === '♙' || piece === '♟') {
                        valid = canPawnMove(from, to, board);
                    } else if (piece === '♖' || piece === '♜') {
                        valid = canRookMove(from, to, board);
                    } else if (piece === '♘' || piece === '♞') {
                        valid = canKnightMove(from, to, board);
                    } else if (piece === '♗' || piece === '♝') {
                        valid = canBishopMove(from, to, board);
                    } else if (piece === '♕' || piece === '♛') {
                        valid = canQueenMove(from, to, board);
                    } else if (piece === '♔' || piece === '♚') {
                        valid = canKingMove(from, to, board);
                    }

                    if (!valid) continue;

                    const temp = cloneBoard(board);
                    temp[to.row][to.col] = piece;
                    temp[from.row][from.col] = ' ';

                    if (!isKingInCheck(temp, color)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

// game arsitektur
function createGame() {
    const board = createBoard();
    let currentTurn = 'white';

    function getBoard() {
        return board;
    }

    function getTurn() {
        return currentTurn;
    }

    function switchTurn() {
        currentTurn = currentTurn === 'white' ? 'black' : 'white';
    }

    function move(from, to) {
        const piece = board[from.row][from.col];

        if (piece === ' ') {
            console.log('No piece at source');
            return;
        }

        if ((currentTurn === 'white' && !isWhite(piece)) || (currentTurn === 'black' && !isBlack(piece))) {
            console.log('Not your turn.');
            return;
        }

        let valid = false;
        if (piece === '♙' || piece === '♟') {
            valid = canPawnMove(from, to, board);
        } else if (piece === '♖' || piece === '♜') {
            valid = canRookMove(from, to, board);
        } else if (piece === '♘' || piece === '♞') {
            valid = canKnightMove(from, to, board);
        } else if (piece === '♗' || piece === '♝') {
            valid = canBishopMove(from, to, board);
        } else if (piece === '♕' || piece === '♛') {
            valid = canQueenMove(from, to, board);
        } else if (piece === '♔' || piece === '♚') {
            valid = canKingMove(from, to, board);
        }

        if (!valid) {
            console.log('Invalid move.');
            return;
        }

        const temp = cloneBoard(board);
        temp[to.row][to.col] = piece;
        temp[from.row][from.col] = ' ';

        if (isKingInCheck(temp, currentTurn)) {
            console.log('Illegal move: king would be in check!');
            return;
        }

        board[to.row][to.col] = piece;
        board[from.row][from.col] = ' ';
        switchTurn();
        
        const enemy = currentTurn;
        const nextTurn = currentTurn === 'white' ? 'black' : 'white';

        if (isKingInCheck(board, enemy)) {
            if (!hasAnyLegalMove(board, enemy)) {
                console.log(`Checkmate! ${nextTurn} wins.`);    
                process.exit(0);
            } else {
                console.log('Check.');
            }
        } else {
            if (!hasAnyLegalMove(board, enemy)) {
                console.log('Stalemate.');
                process.exit(0);
            }
        }
    }

    return {
        getBoard,
        getTurn,
        move
    };
}



export { createGame };