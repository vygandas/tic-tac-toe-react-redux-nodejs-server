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
        router.get('/reset', (req, res) => {
            this.gameBoard = new Board();
            res.json({
                message: `${this.gameBoard.getWhosTurn()} starts the game!`
            })
        });
        router.get('/mark', (req, res) => {
            if (this.gameBoard.setMark(parseInt(req.query.x), parseInt(req.query.y))) {
                res.json({
                    message: `Cell used [x:${req.query.x};y:${req.query.y}]. Now it's turn for ${this.gameBoard.getWhosTurn()}`
                })
            } else {
                res.json({
                    message: `Cell is occupied [x:${req.query.x};y:${req.query.y}]. Now it's still turn for ${this.gameBoard.getWhosTurn()}`
                })
            }

        });
        this.express.use('/', router);
    }

}

export default new App().express;
