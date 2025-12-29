function parsePosition(pos) {
    // edge case, karna butuh input wajib string dan 2 karakter only untuk move
    if (typeof pos !== 'string' || pos.length !== 2) return null;

    const file = pos[0];
    const rank = pos[1];

    const col = file.charCodeAt(0) - 97;
    const row = 8 - Number(rank);

    if (col < 0 || col > 7 || row < 0 || row > 7) return null;

    return {row, col};
}

export { parsePosition };