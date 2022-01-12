import React, { Component } from "react";
import "../../utilities.css";
import "./Game.css";

const Game = (userId) => {
  return (
    <div className="u-flex u-flex-alignCenter u-flex-alignVertical">
      <div id="Game">
        <div className="game-panel">
          <ul>
            <li>Create a Game</li>
            <li>Join a Game</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Game;
