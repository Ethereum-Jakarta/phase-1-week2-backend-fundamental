const readline = require("node:readline");

class ChessMultiplier {
  constructor() {
    this.board = this.createBoard();
    this.currentPlayer = "white";
    this.selectedPiece = null;
    this.selectedPosition = null;
    this.gameOver = false;
    this.scores = { white: 0, black: 0 };

    // Setup readline interface
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "Catur Multiplier> ",
    });
  }

  createBoard() {
    // Inisialisasi papan catur
    const board = [];

    // Inisialisasi array 8x8
    for (let i = 0; i < 8; i++) {
      board[i] = new Array(8).fill(null);
    }

    // Posisi awal bidak hitam (baris 0-1)
    board[0][0] = { type: "rook", color: "black", symbol: "♜", value: 5 };
    board[0][1] = { type: "knight", color: "black", symbol: "♞", value: 3 };
    board[0][2] = { type: "bishop", color: "black", symbol: "♝", value: 3 };
    board[0][3] = { type: "queen", color: "black", symbol: "♛", value: 9 };
    board[0][4] = { type: "king", color: "black", symbol: "♚", value: 0 }; // Raja tidak memiliki nilai
    board[0][5] = { type: "bishop", color: "black", symbol: "♝", value: 3 };
    board[0][6] = { type: "knight", color: "black", symbol: "♞", value: 3 };
    board[0][7] = { type: "rook", color: "black", symbol: "♜", value: 5 };

    for (let i = 0; i < 8; i++) {
      board[1][i] = { type: "pawn", color: "black", symbol: "♟", value: 1 };
    }

    // Posisi awal bidak putih (baris 6-7)
    for (let i = 0; i < 8; i++) {
      board[6][i] = { type: "pawn", color: "white", symbol: "♙", value: 1 };
    }

    board[7][0] = { type: "rook", color: "white", symbol: "♖", value: 5 };
    board[7][1] = { type: "knight", color: "white", symbol: "♘", value: 3 };
    board[7][2] = { type: "bishop", color: "white", symbol: "♗", value: 3 };
    board[7][3] = { type: "queen", color: "white", symbol: "♕", value: 9 };
    board[7][4] = { type: "king", color: "white", symbol: "♔", value: 0 };
    board[7][5] = { type: "bishop", color: "white", symbol: "♗", value: 3 };
    board[7][6] = { type: "knight", color: "white", symbol: "♘", value: 3 };
    board[7][7] = { type: "rook", color: "white", symbol: "♖", value: 5 };

    return board;
  }

  displayBoard() {
    console.clear();
    console.log("==============================================");
    console.log("           CHESS MULTIPLIER GAME");
    console.log("==============================================\n");

    console.log(
      `Giliran: ${
        this.currentPlayer === "white" ? "PUTIH (♙♘♗♖♕♔)" : "HITAM (♟♞♝♜♛♚)"
      }`
    );
    console.log(
      `Skor - Putih: ${this.scores.white} | Hitam: ${this.scores.black}`
    );
    console.log("\n");

    // Header kolom
    console.log("    a   b   c   d   e   f   g   h");
    console.log("  ┌───┬───┬───┬───┬───┬───┬───┬───┐");

    for (let row = 0; row < 8; row++) {
      let rowStr = `${8 - row} │`;

      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        let display = "   ";

        if (piece) {
          // Highlight selected piece
          if (
            this.selectedPosition &&
            this.selectedPosition.row === row &&
            this.selectedPosition.col === col
          ) {
            display = `[${piece.symbol}]`;
          } else {
            display = ` ${piece.symbol} `;
          }
        } else if (
          this.selectedPosition &&
          this.isValidMove(
            this.selectedPosition.row,
            this.selectedPosition.col,
            row,
            col
          )
        ) {
          display = " · ";
        }

        // Alternating background colors
        if ((row + col) % 2 === 0) {
          display = `\x1b[47m\x1b[30m${display}\x1b[0m`;
        }

        rowStr += display;
        if (col < 7) rowStr += "│";
      }

      rowStr += `│ ${8 - row}`;
      console.log(rowStr);

      if (row < 7) {
        console.log("  ├───┼───┼───┼───┼───┼───┼───┼───┤");
      }
    }

    console.log("  └───┴───┴───┴───┴───┴───┴───┴───┘");
    console.log("    a   b   c   d   e   f   g   h\n");

    if (this.selectedPiece) {
      console.log(
        `Bidak terpilih: ${this.selectedPiece.symbol} (${
          this.selectedPiece.type
        }) di ${this.positionToNotation(
          this.selectedPosition.row,
          this.selectedPosition.col
        )}`
      );
    }

    console.log("\n==============================================");
    console.log("PERINTAH:");
    console.log("- pilih [posisi]  : Pilih bidak (contoh: pilih e2)");
    console.log("- gerak [posisi]  : Gerak ke posisi (contoh: gerak e4)");
    console.log("- batal           : Batalkan pilihan bidak");
    console.log("- help            : Tampilkan bantuan");
    console.log("- quit            : Keluar dari game");
    console.log("==============================================\n");
  }

  positionToNotation(row, col) {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return `${letters[col]}${8 - row}`;
  }

  notationToPosition(notation) {
    if (!notation || notation.length !== 2) return null;

    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const col = letters.indexOf(notation[0].toLowerCase());
    const row = 8 - parseInt(notation[1]);

    if (col === -1 || row < 0 || row > 7 || isNaN(row)) {
      return null;
    }

    return { row, col };
  }

  isValidMove(fromRow, fromCol, toRow, toCol) {
    const piece = this.board[fromRow][fromCol];
    if (!piece) return false;

    // Cek apakah tujuan sama dengan asal
    if (fromRow === toRow && fromCol === toCol) return false;

    // Cek apakah ada bidak sendiri di tujuan
    const targetPiece = this.board[toRow][toCol];
    if (targetPiece && targetPiece.color === piece.color) return false;

    // Implementasi aturan gerak sederhana
    switch (piece.type) {
      case "pawn":
        const direction = piece.color === "white" ? -1 : 1;
        const startRow = piece.color === "white" ? 6 : 1;

        // Gerak maju
        if (fromCol === toCol) {
          // Satu langkah maju
          if (toRow === fromRow + direction && !targetPiece) return true;
          // Dua langkah dari posisi awal
          if (
            fromRow === startRow &&
            toRow === fromRow + 2 * direction &&
            !targetPiece &&
            !this.board[fromRow + direction][fromCol]
          )
            return true;
        }
        // Makan diagonal
        else if (
          Math.abs(fromCol - toCol) === 1 &&
          toRow === fromRow + direction &&
          targetPiece &&
          targetPiece.color !== piece.color
        ) {
          return true;
        }
        break;

      case "rook":
        // Gerak lurus
        if (fromRow === toRow || fromCol === toCol) {
          // Cek tidak ada bidak di antara
          const rowStep = fromRow === toRow ? 0 : toRow > fromRow ? 1 : -1;
          const colStep = fromCol === toCol ? 0 : toCol > fromCol ? 1 : -1;

          let currentRow = fromRow + rowStep;
          let currentCol = fromCol + colStep;

          while (currentRow !== toRow || currentCol !== toCol) {
            if (this.board[currentRow][currentCol]) return false;
            currentRow += rowStep;
            currentCol += colStep;
          }
          return true;
        }
        break;

      case "knight":
        const rowDiff = Math.abs(fromRow - toRow);
        const colDiff = Math.abs(fromCol - toCol);
        return (
          (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)
        );

      case "bishop":
        // Gerak diagonal
        if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
          const rowStep = toRow > fromRow ? 1 : -1;
          const colStep = toCol > fromCol ? 1 : -1;

          let currentRow = fromRow + rowStep;
          let currentCol = fromCol + colStep;

          while (currentRow !== toRow && currentCol !== toCol) {
            if (this.board[currentRow][currentCol]) return false;
            currentRow += rowStep;
            currentCol += colStep;
          }
          return true;
        }
        break;

      case "queen":
        // Gabungan rook dan bishop
        const isRookMove = fromRow === toRow || fromCol === toCol;
        const isBishopMove =
          Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol);

        if (isRookMove || isBishopMove) {
          const rowStep = fromRow === toRow ? 0 : toRow > fromRow ? 1 : -1;
          const colStep = fromCol === toCol ? 0 : toCol > fromCol ? 1 : -1;

          let currentRow = fromRow + rowStep;
          let currentCol = fromCol + colStep;

          while (currentRow !== toRow || currentCol !== toCol) {
            if (this.board[currentRow][currentCol]) return false;
            currentRow += rowStep;
            currentCol += colStep;
          }
          return true;
        }
        break;

      case "king":
        // Satu langkah ke segala arah
        return Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1;
    }

    return false;
  }

  movePiece(fromRow, fromCol, toRow, toCol) {
    const piece = this.board[fromRow][fromCol];
    const targetPiece = this.board[toRow][toCol];

    // Hitung skor dengan multiplier
    let multiplier = 1;
    if (targetPiece) {
      // Multiplier berdasarkan tipe bidak yang dimakan
      switch (targetPiece.type) {
        case "queen":
          multiplier = 3;
          break;
        case "rook":
          multiplier = 2.5;
          break;
        case "bishop":
          multiplier = 2;
          break;
        case "knight":
          multiplier = 2;
          break;
        case "pawn":
          multiplier = 1.5;
          break;
      }

      // Tambah skor
      const points = targetPiece.value * multiplier;
      this.scores[piece.color] += points;

      console.log(
        `\n🎯 ${
          piece.color === "white" ? "Putih" : "Hitam"
        } mendapatkan ${points} poin!`
      );
      console.log(`   (${targetPiece.value} × ${multiplier} multiplier)`);
    }

    // Pindahkan bidak
    this.board[toRow][toCol] = piece;
    this.board[fromRow][fromCol] = null;

    // Cek promosi pawn
    if (
      piece.type === "pawn" &&
      ((piece.color === "white" && toRow === 0) ||
        (piece.color === "black" && toRow === 7))
    ) {
      console.log(`\n🎉 Promosi! Pawn menjadi Queen!`);
      this.board[toRow][toCol] = {
        type: "queen",
        color: piece.color,
        symbol: piece.color === "white" ? "♕" : "♛",
        value: 9,
      };
    }

    return true;
  }

  handleCommand(input) {
    const parts = input.trim().toLowerCase().split(" ");
    const command = parts[0];
    const arg = parts[1];

    switch (command) {
      case "pilih":
        if (!arg) {
          console.log("Format: pilih [posisi] (contoh: pilih e2)");
          return;
        }

        const selectPos = this.notationToPosition(arg);
        if (!selectPos) {
          console.log("Posisi tidak valid! Gunakan format seperti e2, a1, h8");
          return;
        }

        const piece = this.board[selectPos.row][selectPos.col];
        if (!piece) {
          console.log("Tidak ada bidak di posisi tersebut!");
          return;
        }

        if (piece.color !== this.currentPlayer) {
          console.log(
            `Bidak itu milik ${
              piece.color === "white" ? "putih" : "hitam"
            }! Giliran ${this.currentPlayer === "white" ? "putih" : "hitam"}.`
          );
          return;
        }

        this.selectedPiece = piece;
        this.selectedPosition = selectPos;
        console.log(`Bidak ${piece.symbol} dipilih di ${arg}`);
        break;

      case "gerak":
        if (!this.selectedPiece) {
          console.log("Pilih bidak terlebih dahulu! (contoh: pilih e2)");
          return;
        }

        if (!arg) {
          console.log("Format: gerak [posisi] (contoh: gerak e4)");
          return;
        }

        const movePos = this.notationToPosition(arg);
        if (!movePos) {
          console.log("Posisi tidak valid! Gunakan format seperti e4, a5, h3");
          return;
        }

        if (
          this.isValidMove(
            this.selectedPosition.row,
            this.selectedPosition.col,
            movePos.row,
            movePos.col
          )
        ) {
          this.movePiece(
            this.selectedPosition.row,
            this.selectedPosition.col,
            movePos.row,
            movePos.col
          );

          // Ganti giliran
          this.currentPlayer =
            this.currentPlayer === "white" ? "black" : "white";
          this.selectedPiece = null;
          this.selectedPosition = null;

          // Cek skor dan kondisi menang
          if (this.scores.white >= 50 || this.scores.black >= 50) {
            this.gameOver = true;
            const winner = this.scores.white >= 50 ? "PUTIH" : "HITAM";
            console.log(`\n🎉🎉🎉 ${winner} MENANG! 🎉🎉🎉`);
            console.log(
              `Skor akhir - Putih: ${this.scores.white}, Hitam: ${this.scores.black}`
            );
          }
        } else {
          console.log("Gerakan tidak valid!");
        }
        break;

      case "batal":
        this.selectedPiece = null;
        this.selectedPosition = null;
        console.log("Pilihan bidak dibatalkan.");
        break;

      case "help":
        console.log("\n📚 BANTUAN PERMAINAN CATUR MULTIPLIER:");
        console.log("1. Pilih bidak dengan: pilih [posisi]");
        console.log("   Contoh: pilih e2");
        console.log("2. Gerakkan bidak dengan: gerak [posisi]");
        console.log("   Contoh: gerak e4");
        console.log(
          "3. Setiap kali memakan bidak lawan, dapatkan poin dengan multiplier:"
        );
        console.log("   - Queen: 3x multiplier");
        console.log("   - Rook: 2.5x multiplier");
        console.log("   - Bishop/Knight: 2x multiplier");
        console.log("   - Pawn: 1.5x multiplier");
        console.log(
          "4. Permainan berakhir ketika salah satu pemain mencapai 50 poin"
        );
        break;

      case "quit":
        console.log("\nTerima kasih telah bermain Catur Multiplier!");
        console.log(
          `Skor akhir - Putih: ${this.scores.white}, Hitam: ${this.scores.black}`
        );
        this.rl.close();
        process.exit(0);
        break;

      default:
        console.log('Perintah tidak dikenali. Ketik "help" untuk bantuan.');
    }
  }

  start() {
    console.clear();
    console.log("==============================================");
    console.log("   SELAMAT DATANG DI CHESS MULTIPLIER GAME!");
    console.log("==============================================\n");
    console.log("Game catur sederhana dengan sistem multiplier poin!");
    console.log(
      "Setiap kali memakan bidak lawan, dapatkan poin dengan multiplier.\n"
    );
    console.log("Tekan Enter untuk melanjutkan...");

    this.rl
      .on("line", (input) => {
        if (this.gameOver) {
          console.log("\n🎉 Permainan selesai!");
          console.log(
            `Skor akhir - Putih: ${this.scores.white}, Hitam: ${this.scores.black}`
          );
          console.log('Ketik "quit" untuk keluar.');
        }

        this.handleCommand(input);
        if (!this.gameOver) {
          this.displayBoard();
        }
        this.rl.prompt();
      })
      .on("close", () => {
        console.log("\nGame berakhir. Sampai jumpa!");
        process.exit(0);
      });

    // Tampilkan papan pertama kali
    this.displayBoard();
    this.rl.prompt();
  }
}

// Jalankan game
const game = new ChessMultiplier();
game.start();
