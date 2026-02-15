import { createInterface } from "node:readline/promises";
import Board, { type Coordinate } from "./lib/Board";
import chalk from "chalk";
import type Piece from "./lib/pieces/Abstraction";
import { Side } from "./lib/constants";

const readline = createInterface(process.stdin, process.stdout);
const board = new Board();

let turn = true;
const eatenWhite: Piece[] = [];
const eatenBlack: Piece[] = [];

while(true) {
  console.clear();
  board.KingBlack.checkmateLevel(...board.KingBlackPos);
  board.KingWhite.checkmateLevel(...board.KingWhitePos);
  console.log(chalk.yellow("----OH MY CHESS!----"));
  board.print();
  console.log(chalk.yellow("--------------------"));
  console.log("Turn :", chalk[turn ? "bgWhite" : "bgBlack"][turn ? "black" : "white"](turn ? "Player 1" : "Player 2"));
  if (eatenWhite.length) console.log(eatenWhite.map(x => x.unicode).join(""));
  if (eatenBlack.length) console.log(eatenBlack.map(x => x.unicode).join(""));
  console.log(chalk.yellow("--------------------"));
  if ((board.KingBlack.checkmate && turn) || (board.KingWhite.checkmate && !turn)) break;
  const answer = await readline.question(chalk.blue("move:") + " ");
  try {
    const [from, to] = answer.split(" ");
    if (!from || !to) throw ReferenceError("Forbidden Coordinate");
    const eatenPieace = board.move(turn, from as Coordinate, to as Coordinate);
    if (eatenPieace) (eatenPieace.side === Side.White ? eatenWhite : eatenBlack).push(eatenPieace);
  } catch(e) {
    if ((e as Error).message === "Forbidden Coordinate") continue;
    throw e;
  }
  turn = !turn;
}
  console.log("Winner! :", chalk[turn ? "bgWhite" : "bgBlack"][turn ? "black" : "white"](turn ? "Player 1" : "Player 2"));

readline.close();
