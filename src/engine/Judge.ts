import { IPlayer } from "../interfaces/IPlayer";
import { IGridCell } from "../interfaces/IGridCell";

class Judge {

    protected boardGrid: IGridCell[][];

    public getWinner = (): keyof IPlayer | null => {
        return null;
    }

}

export default Judge;
