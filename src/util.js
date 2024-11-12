import { WINNING_COMBINATIONS } from "./winning-combo";

export const PLAYERS = {
    X: "Player 1",
    O: "Player 2",
};

export const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export function deriveActivePlayer(gameTurns) {
    return gameTurns.length % 2 === 0 ? "X" : "O";
}

export function deriveGameBoard(gameTurns) {
    return INITIAL_GAME_BOARD.map((row, rowIndex) =>
        row.map(
            (cell, colIndex) =>
                gameTurns.find(
                    (turn) =>
                        turn.square.row === rowIndex &&
                        turn.square.col === colIndex
                )?.player || null
        )
    );
}

export function deriveWinner(gameBoard, players) {
    let winner = null;

    for (const combo of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combo[0].row][combo[0].column];
        const secondSquareSymbol = gameBoard[combo[1].row][combo[1].column];
        const thirdSquareSymbol = gameBoard[combo[2].row][combo[2].column];

        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = firstSquareSymbol; // Set winner to "X" or "O"
            break;
        }
    }

    const hasDraw = !winner && gameBoard.flat().every((cell) => cell !== null);
    return { winner, hasDraw };
}
