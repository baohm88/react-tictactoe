import React from "react";

export default function GameResults({ results }) {
    return (
        <p id="results">
            {results.X} - {results.O}
        </p>
    );
}
