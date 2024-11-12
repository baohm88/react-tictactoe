import React from "react";
import GameResults from "./GameResults";

export default function GameOver({ winner, hasDraw, onRestart, results, players }) {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner && <p>{players[winner]} won this round!</p>}
            <GameResults results={results} />
            {hasDraw && <p>It's a draw</p>}
            <p>
                <button onClick={onRestart}>Rematch!</button>
            </p>
        </div>
    );
}
