// index.js
import ChessGame from './chessGame.js';

const game = new ChessGame();
game.playGame().catch(console.error);