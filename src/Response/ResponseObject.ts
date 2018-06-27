import Board from "../engine/Board";

export const responseObject = (message: string | number | null, board: Board) => {
    const gameOver = board.isGameOver();
    let msg = message;
    if (gameOver) {
        msg = `GAME OVER! ${board.getWinner()} has won!`;
    }
    return {
        message: msg,
        gameOver,
        grid: board.getBoardGrid()
    };
};
