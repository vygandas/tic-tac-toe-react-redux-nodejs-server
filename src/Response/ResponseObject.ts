import Board from "../engine/Board";

export const responseObject = (message: string, board: Board) => ({
    message,
    gameOver: board.isGameOver(),
    grid: board.getBoardGrid()
});
