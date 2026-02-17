// chessGame.js
import readline from 'readline';
import { initializeBoard } from './boardInitializer.js';
import { displayBoard } from './boardDisplay.js';
import { parsePosition } from './utils.js';
import { isValidMove } from './moveValidation.js';
import { makeMove } from './moveExecution.js';
import { findKing, isInCheck, isCheckmate } from './gameStatus.js';

class ChessGame {
    constructor() {
        this.board = initializeBoard();
        this.currentPlayer = 'white';
        this.gameOver = false;
        this.winner = null;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    displayBoard() {
        displayBoard(this.board, this.currentPlayer, this.isInCheck(this.currentPlayer));
    }

    parsePosition(pos) {
        return parsePosition(pos);
    }

    // Defensive: always use correct makeMove signature for all internal calls
    isValidMove(fromPos, toPos) {
        return isValidMove(
            this.board,
            this.currentPlayer,
            fromPos,
            toPos,
            this.isValidPieceMove.bind(this),
            this.copyBoard.bind(this),
            this.isInCheck.bind(this),
            (board, from, to) => makeMove(board, from, to) // Fix: pass correct makeMove signature
        );
    }

    isValidPieceMove(piece, from, to) {
        const rowDiff = to.row - from.row;
        const colDiff = to.col - from.col;
        const absRowDiff = Math.abs(rowDiff);
        const absColDiff = Math.abs(colDiff);

        switch (piece.type) {
            case 'pawn':
                return this.isValidPawnMove(piece, from, to, rowDiff, colDiff);
            case 'rook':
                return this.isValidRookMove(from, to, rowDiff, colDiff);
            case 'knight':
                return (absRowDiff === 2 && absColDiff === 1) || (absRowDiff === 1 && absColDiff === 2);
            case 'bishop':
                return this.isValidBishopMove(from, to, rowDiff, colDiff);
            case 'queen':
                return this.isValidRookMove(from, to, rowDiff, colDiff) ||
                       this.isValidBishopMove(from, to, rowDiff, colDiff);
            case 'king':
                return absRowDiff <= 1 && absColDiff <= 1 && (absRowDiff + absColDiff > 0);
            default:
                return false;
        }
    }

    isValidPawnMove(piece, from, to, rowDiff, colDiff) {
        const direction = piece.color === 'white' ? 1 : -1;
        const startRow = piece.color === 'white' ? 1 : 6;
        const targetPiece = this.board[to.row][to.col];

        // Forward move
        if (colDiff === 0 && !targetPiece) {
            if (rowDiff === direction) return true;
            if (from.row === startRow && rowDiff === 2 * direction) return true;
        }

        // Diagonal capture
        if (Math.abs(colDiff) === 1 && rowDiff === direction && targetPiece) {
            return true;
        }

        return false;
    }

    isValidRookMove(from, to, rowDiff, colDiff) {
        if (rowDiff !== 0 && colDiff !== 0) return false;
        return this.isPathClear(from, to);
    }

    isValidBishopMove(from, to, rowDiff, colDiff) {
        if (Math.abs(rowDiff) !== Math.abs(colDiff)) return false;
        return this.isPathClear(from, to);
    }

    isPathClear(from, to) {
        const rowStep = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
        const colStep = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;

        let currentRow = from.row + rowStep;
        let currentCol = from.col + colStep;

        while (currentRow !== to.row || currentCol !== to.col) {
            if (this.board[currentRow][currentCol]) {
                return false;
            }
            currentRow += rowStep;
            currentCol += colStep;
        }

        return true;
    }

    // Defensive: always use correct makeMove signature for all internal calls
    makeMove(from, to) {
        // This method is only for real moves, not for simulation (checkmate/validation)
        makeMove(this.board, from, to);
    }

    findKing(color) {
        return findKing(this.board, color);
    }

    isInCheck(color) {
        return isInCheck(this.board, color, this.isValidPieceMove.bind(this));
    }

    // Defensive: always use correct makeMove signature for all internal calls
    isCheckmate(color) {
        return isCheckmate(
            this.board,
            color,
            this.isInCheck.bind(this),
            this.isValidPieceMove.bind(this),
            this.copyBoard.bind(this),
            (board, from, to) => makeMove(board, from, to)
        );
    }

    copyBoard() {
        return this.board.map(row =>
            row.map(piece => piece ? { ...piece } : null)
        );
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    }

    async playGame() {
        console.log('🎯 Welcome to CLI Chess Game! 🎯');
        console.log('Enter moves in format: from to (e.g., e2 e4)');
        console.log('Type "quit" to exit the game\n');

        while (!this.gameOver) {
            this.displayBoard();

            if (this.isCheckmate(this.currentPlayer)) {
                this.gameOver = true;
                this.winner = this.currentPlayer === 'white' ? 'black' : 'white';
                console.log(`\n🏆 CHECKMATE! ${this.winner.toUpperCase()} WINS! 🏆`);
                break;
            }

            const move = await this.getPlayerMove();

            if (move.toLowerCase() === 'quit') {
                console.log('Game ended by player.');
                break;
            }

            const moveData = move.split(' ');
            if (moveData.length !== 2) {
                console.log('❌ Invalid input format. Use: from to (e.g., e2 e4)');
                await this.waitForEnter();
                continue;
            }

            const [from, to] = moveData;
            const validation = this.isValidMove(from, to);

            if (!validation.valid) {
                console.log(`❌ ${validation.error}`);
                await this.waitForEnter();
                continue;
            }

            const fromPos = this.parsePosition(from);
            const toPos = this.parsePosition(to);

            this.makeMove(fromPos, toPos);
            this.switchPlayer();
        }

        this.rl.close();
    }

    getPlayerMove() {
        return new Promise((resolve) => {
            this.rl.question(`\n${this.currentPlayer.toUpperCase()}'s turn. Enter your move: `, (answer) => {
                resolve(answer.trim());
            });
        });
    }

    waitForEnter() {
        return new Promise((resolve) => {
            this.rl.question('Press Enter to continue...', () => {
                resolve();
            });
        });
    }
}

export default ChessGame;