import { Pawn } from './pieces/Pawn.js';
import { Rook } from './pieces/Rook.js';
import { Bishop } from './pieces/Bishop.js';
import { Knight } from './pieces/Knight.js';
import { Queen } from './pieces/Queen.js';
import { King } from './pieces/King.js';

export class Board {
  constructor() {
    this.grid = Array.from({ length: 8 }, () => Array(8).fill(null));
    this.initialize();
  }

  initialize() {
    for (let col = 0; col < 8; col++) {
      this.grid[1][col] = new Pawn('black');
      this.grid[6][col] = new Pawn('white');
    }
    this.grid[0][0] = new Rook('black');
    this.grid[0][7] = new Rook('black');
    this.grid[7][0] = new Rook('white');
    this.grid[7][7] = new Rook('white');

    this.grid[0][2] = new Bishop('black');
    this.grid[0][5] = new Bishop('black');
    this.grid[7][2] = new Bishop('white');
    this.grid[7][5] = new Bishop('white');

    this.grid[0][1] = new Knight('black');
    this.grid[0][6] = new Knight('black');
    this.grid[7][1] = new Knight('white');
    this.grid[7][6] = new Knight('white');

    this.grid[0][3] = new Queen('black');
    this.grid[7][3] = new Queen('white');
    
    this.grid[0][4] = new King('black');
    this.grid[7][4] = new King('white');
  }

  getPiece([row, col]) {
    return this.grid[row][col];
  }

  setPiece([row, col], piece) {
    this.grid[row][col] = piece;
  }
  
}
