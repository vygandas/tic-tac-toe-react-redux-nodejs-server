import * as express from 'express';
import Board from "./engine/Board";
import { responseObject } from "./Response/ResponseObject";

class App {

    public express;

    private gameBoard: Board = null;

    constructor () {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes (): void {
        const router = express.Router();

        router.get('/', (req, res) => { res.json(responseObject('Hello Players! Wanna play?', this.gameBoard)); });

        router.get('/reset', (req, res) => {
            this.gameBoard = new Board();
            res.json(responseObject(`${this.gameBoard.getWhosTurn()} starts the game!`, this.gameBoard));
        });

        router.get('/mark', (req, res) => {
            if (!this.gameBoard.isGameOver()) {
                if (this.gameBoard.setMark(parseInt(req.query.x), parseInt(req.query.y))) {
                    res.json(responseObject(`Cell used [x:${req.query.x};y:${req.query.y}]. Now it's turn for ${this.gameBoard.getWhosTurn()}`, this.gameBoard));
                } else {
                    res.json(responseObject(`Cell is occupied [x:${req.query.x};y:${req.query.y}]. Now it's still turn for ${this.gameBoard.getWhosTurn()}`, this.gameBoard));
                }
            } else {
                const msg = this.gameBoard.getWinner() === null ? 'It\'s a tie :|' : `${this.gameBoard.getWinner()} has won!`;
                res.json(responseObject(`GAME OVER! ${msg}`, this.gameBoard));
            }

        });

        router.get('/winner', (req, res) => { res.json(responseObject(this.gameBoard.getWinner(), this.gameBoard)); });

        this.express.use('/', router);
    }

}

export default new App().express;
