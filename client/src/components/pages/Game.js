import React, { Component } from "react";
import "../../utilities.css";
import "./Game.css";

const Game = (userId) => {
  return (
    <div className="u-flex u-flex-alignCenter u-flex-alignVertical">
      <div id="Game">
        <div className="game-panel">
          <div className="create-game-box">Create a Game</div>
          <div className="join-game-box">Join a Game</div>
        </div>
      </div>
    </div>
  );
};

export default Game;
