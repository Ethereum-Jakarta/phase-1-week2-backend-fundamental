import { parsePosition } from "./parser.js";
import { renderBoard } from "./boardView.js";
import { createGame } from "./game.js";

function run() {
    const args = process.argv.slice(2);

    if (args.length !== 2) {
        console.log('Usage: node index.js <from> <to>');
        console.log('Example: node index.js e2 e4');
        return;
    }

    const from = parsePosition(args[0]);
    const to = parsePosition(args[1]);

    if (!from || !to) {
        console.log('Invalid position input');
        return;
    }
    
    const game = createGame();

    console.log('Before Move:');
    renderBoard(game.getBoard());

    game.move(from, to);

    console.log('After Move:');
    renderBoard(game.getBoard());

    console.log('Next Turn:', game.getTurn());
}

export { run };