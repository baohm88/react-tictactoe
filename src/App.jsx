// import { useEffect, useState } from "react";
// import GameBoard from "./components/GameBoard";
// import Player from "./components/Player";
// import Log from "./components/Log";
// import GameOver from "./components/GameOver";
// import GameResults from "./components/GameResults";

// import {
//     deriveActivePlayer,
//     deriveGameBoard,
//     deriveWinner,
//     PLAYERS,
// } from "./util";

// function App() {
//     const [players, setPlayers] = useState(() => {
//         const savedPlayers = JSON.parse(localStorage.getItem("players"));
//         return savedPlayers || PLAYERS;
//     });
//     const [gameTurns, setGameTurns] = useState([]);

//     // Initialize results from localStorage or default to { X: 0, O: 0 }
//     const [results, setResults] = useState(() => {
//         const savedResults = JSON.parse(localStorage.getItem("results"));
//         return savedResults || { X: 0, O: 0 };
//     });

//     const activePlayer = deriveActivePlayer(gameTurns);
//     const gameBoard = deriveGameBoard(gameTurns);
//     const { winner, hasDraw } = deriveWinner(gameBoard, players);

//     // Save players to localStorage when they change
//     useEffect(() => {
//         localStorage.setItem("players", JSON.stringify(players));
//     }, [players]);

//     // Save results to localStorage whenever they change
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

//     function handleSelectSquare(rowIndex, colIndex) {
//         if (gameBoard[rowIndex][colIndex] || winner) return;

//         setGameTurns((prevTurns) => [
//             { square: { row: rowIndex, col: colIndex }, player: activePlayer },
//             ...prevTurns,
//         ]);
//     }

//     function handleRestart() {
//         setGameTurns([]);
//     }

//     function handlePlayerNameChange(symbol, newName) {
//         setPlayers((prevPlayers) => ({
//             ...prevPlayers,
//             [symbol]: newName,
//         }));
//     }

//     return (
//         <main>
//             <div id="game-container">
//                 <GameResults results={results} />

//                 <ol id="players" className="highlight-player">
//                     <Player
//                         initialName={players.X}
//                         symbol="X"
//                         isActive={activePlayer === "X"}
//                         onChangePlayerName={handlePlayerNameChange}
//                     />
//                     <Player
//                         initialName={players.O}
//                         symbol="O"
//                         isActive={activePlayer === "O"}
//                         onChangePlayerName={handlePlayerNameChange}
//                     />
//                 </ol>
//                 {(winner || hasDraw) && (
//                     <GameOver
//                         winner={winner}
//                         hasDraw={hasDraw}
//                         onRestart={handleRestart}
//                         results={results}
//                     />
//                 )}
//                 <GameBoard
//                     onSelectSquare={handleSelectSquare}
//                     board={gameBoard}
//                 />
//             </div>
//             <Log turns={gameTurns} />
//         </main>
//     );
// }

// export default App;


import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import GameResults from "./components/GameResults";
import { useGameLogic } from "./hooks/useGameLogic";

function App() {
    const {
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
    } = useGameLogic();
    

    return (
        <main>
            <div id="game-container">
                <GameResults results={results} />

                <ol id="players" className="highlight-player">
                    <Player
                        initialName={players.X}
                        symbol="X"
                        isActive={activePlayer === "X"}
                        onChangePlayerName={handlePlayerNameChange}
                    />
                    <Player
                        initialName={players.O}
                        symbol="O"
                        isActive={activePlayer === "O"}
                        onChangePlayerName={handlePlayerNameChange}
                    />
                </ol>
                {(winner || hasDraw) && (
                    <GameOver
                        winner={winner}
                        hasDraw={hasDraw}
                        onRestart={handleRestart}
                        results={results}
                        players={players}
                    />
                )}
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    board={gameBoard}
                />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
