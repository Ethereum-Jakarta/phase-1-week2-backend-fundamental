export class ConsoleView {
  printBoard(board) {
    const letters = '  a b c d e f g h';
    console.log("\n")
    console.log(letters);
    for (let i = 0; i < 8; i++) {
      const row = board.grid[i]
        .map(cell => cell ? cell.symbol : '·')
        .join(' ');
      console.log(`${8 - i} ${row} ${8 - i}`);
    }
    console.log(letters);
  }

  showError(msg) {
    console.log(msg);
  }

  showCapture(attacker, target) {
    console.log(`${attacker.symbol} memakan ${target.symbol}`);
  }

  showCheck(player) {
  console.log(`${player.toUpperCase()} sedang skak!`);
  }

  showCheckmate(winner) {
    console.log(`Skakmat! ${winner.toUpperCase()} menang!`);
  }

  showDraw(player) {
    console.log(`Remis! Tidak ada langkah sah untuk ${player.toUpperCase()}`);
  }

  showPromotion(piece) {
    console.log(`Pion dipromosikan menjadi ${piece.symbol}`);
  }

}
