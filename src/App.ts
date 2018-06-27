import * as express from 'express';
import Board from "./engine/Board";
import { responseObject } from "./Response/ResponseObject";

class App {

    public express;

    private gameBoard: Board = null;

    private actionsLog = [];

    private gameStarted: boolean = false;

    constructor () {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes (): void {
        const router = express.Router();
        this.gameBoard = new Board();

        router.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        router.get('/', (req, res) => {
            const response = !this.gameStarted ? responseObject('Hello Players! Wanna play?', this.gameBoard) : responseObject(this.gameBoard.getMessage(), this.gameBoard);
            this.gameBoard.setMessage(response.message.toString());
            res.json(response);
        });

        router.get('/reset', (req, res) => {
            this.gameBoard = new Board();
            this.gameBoard.setMessage('Loading...');
            res.json(responseObject(`${this.gameBoard.getWhosTurn()} starts the game!`, this.gameBoard));
        });

        router.get('/mark', (req, res) => {
            if (this.gameBoard.setMark(parseInt(req.query.x), parseInt(req.query.y))) {
                const response = responseObject(`Cell used [x:${req.query.x};y:${req.query.y}]. Now it's turn for ${this.gameBoard.getWhosTurn()}`, this.gameBoard);
                this.gameBoard.setMessage(response.message.toString());
                res.json(response);
            } else {
                const response = responseObject(`Cell is occupied [x:${req.query.x};y:${req.query.y}]. Now it's still turn for ${this.gameBoard.getWhosTurn()}`, this.gameBoard);
                this.gameBoard.setMessage(response.message.toString());
                res.json(response);
            }
        });

        router.get('/state', (req, res) => { res.json(); });

        this.express.use('/', router);
    }

}

export default new App().express;
