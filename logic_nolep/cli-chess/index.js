import readline from 'readline';
import { createGame } from "./game.js";
import { renderBoard } from "./boardView.js";
import { parsePosition } from "./parser.js";
import { parse } from 'path';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const game = createGame();

function chess() {
    rl.question('move or exit: ', (input) => {
        if (input === 'exit') return rl.close();

        const [fromStr, toStr] = input.split(' ');
        const from = parsePosition(fromStr);
        const to = parsePosition(toStr);

        if (!from || !to) {
            console.log('Invalid input.');
            return chess();
        }

        game.move(from, to);
        renderBoard(game.getBoard());
        console.log('Turn:', game.getTurn());

        chess();
    });
}

renderBoard(game.getBoard());
chess();