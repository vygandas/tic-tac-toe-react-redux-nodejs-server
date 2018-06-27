import Board from "../engine/Board";

export const responseObject = (message: string | number | null, board: Board) => {
    const gameOver = board.isGameOver();
    let msg = message;
    if (gameOver) {
        const sysWinner = board.getWinner();
        const winner = sysWinner !== null ? sysWinner : 'NOBODY';
        msg = `GAME OVER! ${winner} has won!`;
    }
    return {
        message: msg,
        gameOver,
        grid: board.getBoardGrid()
    };
};
