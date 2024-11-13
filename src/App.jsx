import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
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

                <ol id="players" className="highlight-player">
                    <Player
                        initialName={players.X}
                        symbol="X"
                        isActive={activePlayer === "X"}
                        onChangePlayerName={handlePlayerNameChange}
                    />
                <GameResults results={results} />
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
            
        </main>
    );
}

export default App;
