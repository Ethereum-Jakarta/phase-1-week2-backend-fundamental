import { ChessModel } from "./model.js";
import { ChessView } from "./view.js";
import { ChessController } from "./controller.js";

async function main() {
    const model = new ChessModel();
    const view = new ChessView();
    const controller = new ChessController(model, view);

    await controller.jalankanPermainan();
}

main();