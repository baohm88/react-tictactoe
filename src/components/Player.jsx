import React, { useState } from "react";

export default function Player({
    initialName,
    symbol,
    isActive,
    onChangePlayerName,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleNameChange(e) {
        setPlayerName(e.target.value);
    }

    function handleEditClick() {
        if (isEditing) {
            // If we're finishing editing, update the player's name
            onChangePlayerName(symbol, playerName);
        }
        setIsEditing(!isEditing); // Toggle editing mode
    }

    function handleEnter(e) {
        if (e.key === "Enter") {
            handleEditClick();
        }
    }

    return (
        <li className={isActive ? "active" : ""}>
            <span className="player">
                {isEditing ? (
                    <input
                        type="text"
                        value={playerName}
                        onChange={handleNameChange}
                        onKeyDown={handleEnter}
                        onBlur={handleEditClick} // Close edit mode on blur
                        autoFocus
                        required
                        aria-label={`Edit name for player ${symbol}`}
                    />
                ) : (
                    <span
                        className="player-name"
                        onClick={handleEditClick}
                        aria-label={`Player ${symbol} name: ${playerName}`}
                    >
                        {playerName}
                    </span>
                )}
                <span className="player-symbol">{symbol}</span>
            </span>
        </li>
    );
}
