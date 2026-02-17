// utils.js
export function parsePosition(pos) {
    if (typeof pos !== 'string' || pos.length !== 2) {
        return null;
    }

    const col = pos.charCodeAt(0) - 'a'.charCodeAt(0);
    const row = parseInt(pos[1]) - 1;

    if (col < 0 || col > 7 || row < 0 || row > 7 || isNaN(row)) {
        return null;
    }

    return { row, col };
}

export function copyBoard(board) {
    return board.map(row =>
        row.map(piece => piece ? { ...piece } : null)
    );
}