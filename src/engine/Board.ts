import { gridGenerator } from "./Grid";
import { IPlayer } from "../interfaces/IPlayer";


class Board {

    private boardSize;

    private boardGrid;

    constructor(size: number = 3) {
        this.boardSize = size;
        this.boardGrid = gridGenerator(size);
    }

    public getBoardSize = () => this.boardSize;

    public getBoardGrid = () => this.boardGrid;

    public setPlayerMark = (x: number, y: number, player: keyof IPlayer) => {
        this.boardGrid[y][x] = player;
    }

}

export default Board;