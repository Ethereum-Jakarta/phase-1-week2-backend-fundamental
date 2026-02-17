// boardDisplay.js
export function displayBoard(board, currentPlayer, isInCheck) {
    console.clear();
    console.log('\n  ╔═══════════════════════════════════╗');
    console.log('  ║           CLI Chess Game          ║');
    console.log('  ╚═══════════════════════════════════╝\n');
    console.log('    a   b   c   d   e   f   g   h');
    console.log('  ┌───┬───┬───┬───┬───┬───┬───┬───┐');

    for (let row = 7; row >= 0; row--) {
        let line = `${row + 1} │`;
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece) {
                line += ` ${piece.symbol} │`;
            } else {
                line += '   │';
            }
        }
        line += ` ${row + 1}`;
        console.log(line);

        if (row > 0) {
            console.log('  ├───┼───┼───┼───┼───┼───┼───┼───┤');
        }
    }

    console.log('  └───┴───┴───┴───┴───┴───┴───┴───┘');
    console.log('    a   b   c   d   e   f   g   h\n');
    console.log(`Current Player: ${currentPlayer.toUpperCase()}`);

    if (isInCheck) {
        console.log(`⚠️  ${currentPlayer.toUpperCase()} KING IS IN CHECK! ⚠️`);
    }
}