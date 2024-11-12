// import { useEffect, useState } from "react";
// import { deriveActivePlayer, deriveGameBoard, deriveWinner, PLAYERS } from "../util";

// export function useGameLogic() {
//     // Player state
//     const [players, setPlayers] = useState(() => {
//         const savedPlayers = JSON.parse(localStorage.getItem("players"));
//         return savedPlayers || PLAYERS;
//     });

//     // Game turns state
//     const [gameTurns, setGameTurns] = useState([]);

//     // Results state (X and O scores)
//     const [results, setResults] = useState(() => {
//         const savedResults = JSON.parse(localStorage.getItem("results"));
//         return savedResults || { X: 0, O: 0 };
//     });

//     // Derive active player and game board
//     const activePlayer = deriveActivePlayer(gameTurns);
//     const gameBoard = deriveGameBoard(gameTurns);
//     const { winner, hasDraw } = deriveWinner(gameBoard, players);

//     // Save players to localStorage when they change
//     useEffect(() => {
//         localStorage.setItem("players", JSON.stringify(players));
//     }, [players]);

//     // Save results to localStorage when they change
//     useEffect(() => {
//         localStorage.setItem("results", JSON.stringify(results));
//     }, [results]);

//     // Update results when there is a winner
//     useEffect(() => {
//         if (winner === "X" || winner === "O") {
//             setResults((prevResults) => ({
//                 ...prevResults,
//                 [winner]: prevResults[winner] + 1,
//             }));
//         }
//     }, [winner]);

//     // Function to handle square selection
//     const handleSelectSquare = (rowIndex, colIndex) => {
//         if (gameBoard[rowIndex][colIndex] || winner) return;

//         setGameTurns((prevTurns) => [
//             { square: { row: rowIndex, col: colIndex }, player: activePlayer },
//             ...prevTurns,
//         ]);
//     };

//     // Function to handle restarting the game
//     const handleRestart = () => {
//         setGameTurns([]);
//     };

//     // Function to change player names
//     const handlePlayerNameChange = (symbol, newName) => {
//         setPlayers((prevPlayers) => ({
//             ...prevPlayers,
//             [symbol]: newName,
//         }));
//     };

//     return {
//         players,
//         gameTurns,
//         results,
//         activePlayer,
//         gameBoard,
//         winner,
//         hasDraw,
//         handleSelectSquare,
//         handleRestart,
//         handlePlayerNameChange,
//     };
// }


import { useEffect, useState } from "react";
import { deriveActivePlayer, deriveGameBoard, deriveWinner, PLAYERS } from "../util";

export function useGameLogic() {
    // Player state
    const [players, setPlayers] = useState(() => {
        const savedPlayers = JSON.parse(localStorage.getItem("players"));
        return savedPlayers || PLAYERS;
    });

    // Game turns state
    const [gameTurns, setGameTurns] = useState(() => {
        const savedGameTurns = JSON.parse(localStorage.getItem("gameTurns"));
        return savedGameTurns || [];
    });

    // Game board state derived from gameTurns
    const gameBoard = deriveGameBoard(gameTurns);

    // Results state (X and O scores)
    const [results, setResults] = useState(() => {
        const savedResults = JSON.parse(localStorage.getItem("results"));
        return savedResults || { X: 0, O: 0 };
    });

    // Derive active player
    const activePlayer = deriveActivePlayer(gameTurns);

    // Derive winner and draw state
    const { winner, hasDraw } = deriveWinner(gameBoard, players);

    // Save players to localStorage when they change
    useEffect(() => {
        localStorage.setItem("players", JSON.stringify(players));
    }, [players]);

    // Save gameTurns and gameBoard to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("gameTurns", JSON.stringify(gameTurns));
        // localStorage.setItem("gameBoard", JSON.stringify(gameBoard));
    }, [gameTurns, gameBoard]);

    // Save results to localStorage when they change
    useEffect(() => {
        localStorage.setItem("results", JSON.stringify(results));
    }, [results]);

    // Update results when there is a winner
    useEffect(() => {
        if (winner === "X" || winner === "O") {
            setResults((prevResults) => ({
                ...prevResults,
                [winner]: prevResults[winner] + 1,
            }));
        }
    }, [winner]);

    // Function to handle square selection
    const handleSelectSquare = (rowIndex, colIndex) => {
        if (gameBoard[rowIndex][colIndex] || winner) return;

        setGameTurns((prevTurns) => [
            { square: { row: rowIndex, col: colIndex }, player: activePlayer },
            ...prevTurns,
        ]);
    };

    // Function to handle restarting the game
    const handleRestart = () => {
        setGameTurns([]);
        // Optionally clear localStorage when restarting
        localStorage.removeItem("gameTurns");
        // localStorage.removeItem("gameBoard");
    };

    // Function to change player names
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
