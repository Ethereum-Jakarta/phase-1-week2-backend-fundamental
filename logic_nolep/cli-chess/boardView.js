function renderBoard(board) {
    console.log('\n    a   b   c   d   e   f   g   h');
    console.log('  ---------------------------------');

    for (let row = 0; row < 8; row++) {
        let line = `${8 - row} |`;
        for (let col = 0; col < 8; col++) {
            line += ` ${board[row][col]} |`;
        }
        console.log(line + ` ${8 - row}`)
        console.log('  ---------------------------------');
    }
    console.log('    a   b   c   d   e   f   g   h\n');
}

export { renderBoard };