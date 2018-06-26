import { gridGenerator } from "./Grid";
import { IPlayer } from "../interfaces/IPlayer";
import { IGridCell } from "../interfaces/IGridCell";
import Judge from "./Judge";


class Board extends Judge {

    private boardSize: number;

    protected boardGrid: IGridCell[][];

    constructor(size: number = 3) {
        super();
        this.boardSize = size;
        this.boardGrid = gridGenerator(size);
    }

    public getBoardSize = (): number => this.boardSize;

    public getBoardGrid = (): IGridCell[][] => this.boardGrid;

    public setPlayerMark = (x: number, y: number, player: keyof IPlayer): void => {
        this.boardGrid[y][x] = <IGridCell>player;
    }

}

export default Board;