import React from "react";

export default function GameResults({ results }) {
    return (
        <li id="results">
            <span>{results.X} : {results.O}</span>
            
        </li>
    );
}
