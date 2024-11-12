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
        setIsEditing((editing) => !editing);
        
        if (isEditing) {
            onChangePlayerName(symbol, playerName);
        }
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        editablePlayerName = (
            <input
                type="text"
                required
                value={playerName}
                onChange={handleNameChange}
            />
        );
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>
    );
}
