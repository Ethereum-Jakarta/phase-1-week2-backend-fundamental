import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "process";
import { main, createBoard, printBoard } from "./system.js";
import chalk from "chalk";

const rl = createInterface({
  input: stdin,
  output: stdout,
});

async function game() {
  console.log(chalk.green("=== Silent Chess ==="));
  console.log(
    chalk.yellow.bold("> No check protection. Watch the board closely!\n"),
  );
  createBoard();
  printBoard();
  let currentTurn = "white";

  while (true) {
    console.log(`${currentTurn} Turn`);

    const from = (await rl.question("From: ")).trim();
    const to = (await rl.question("To: ")).trim();

    const result = main(from, to, currentTurn);

    if (result === false) {
      break;
    }

    if (result === "moved") {
      currentTurn = currentTurn === "white" ? "black" : "white";
    }
  }

  console.log("Exiting game...");
  rl.close();
}

await game().catch((err) => {
  if (err.code == "ABORT_ERR") {
    console.log(chalk.yellow("\nGame closed via Ctrl+C. Goodbye!"));
    process.exit(0);
  } else {
    console.error(err);
  }
});
