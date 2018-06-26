import * as express from 'express';
import Board from "./engine/Board";

class App {

    public express;

    private gameBoard: Board = null;

    constructor () {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes (): void {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: 'Hello Players! Wanna play?'
            })
        });
        this.express.use('/', router);
    }

}

export default new App().express;
