import { useEffect, useState } from "react";
import {
    deriveActivePlayer,
    deriveGameBoard,
    deriveWinner,
    PLAYERS,
} from "../util";

export function useGameLogic() {
    const [startingPlayer, setStartingPlayer] = useState(() => {
        return localStorage.getItem("startingPlayer") || "X";
    });

    const [players, setPlayers] = useState(() => {
        const savedPlayers = JSON.parse(localStorage.getItem("players"));
        return savedPlayers || PLAYERS;
    });

    const [gameTurns, setGameTurns] = useState(() => {
        const savedGameTurns = JSON.parse(localStorage.getItem("gameTurns"));
        return savedGameTurns || [];
    });

    const gameBoard = deriveGameBoard(gameTurns);

    const [results, setResults] = useState(() => {
        const savedResults = JSON.parse(localStorage.getItem("results"));
        return savedResults || { X: 0, O: 0 };
    });

    // Determine active player based on startingPlayer and gameTurns length
    const activePlayer =
        gameTurns.length % 2 === 0
            ? startingPlayer
            : startingPlayer === "X"
            ? "O"
            : "X";

    const { winner, hasDraw } = deriveWinner(gameBoard, players);

    useEffect(() => {
        localStorage.setItem("players", JSON.stringify(players));
    }, [players]);

    useEffect(() => {
        localStorage.setItem("gameTurns", JSON.stringify(gameTurns));
    }, [gameTurns]);

    useEffect(() => {
        localStorage.setItem("results", JSON.stringify(results));
    }, [results]);

    useEffect(() => {
        localStorage.setItem("startingPlayer", startingPlayer);
    }, [startingPlayer]);

    // Update results when there is a winner
    useEffect(() => {
        if (winner === "X" || winner === "O") {
            setResults((prevResults) => ({
                ...prevResults,
                [winner]: prevResults[winner] + 1,
            }));
        }
    }, [winner]);

    const handleSelectSquare = (rowIndex, colIndex) => {
        if (gameBoard[rowIndex][colIndex] || winner) return;

        setGameTurns((prevTurns) => [
            { square: { row: rowIndex, col: colIndex }, player: activePlayer },
            ...prevTurns,
        ]);
    };

    const handleRestart = () => {
        setGameTurns([]);
        setStartingPlayer((prev) => (prev === "X" ? "O" : "X"));
        localStorage.removeItem("gameTurns");
    };

    const handlePlayerNameChange = (symbol, newName) => {
        setPlayers((prevPlayers) => ({
            ...prevPlayers,
            [symbol]: newName,
        }));
    };

    return {
        players,
        gameTurns,
        results,
        activePlayer,
        gameBoard,
        winner,
        hasDraw,
        handleSelectSquare,
        handleRestart,
        handlePlayerNameChange,
    };
}
