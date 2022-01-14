import React, { Component, useEffect } from "react";
import "../../utilities.css";
import "./Game.css";
import GameCodeInput from "./GameCodeInput.js";
import Name from "./name.js";

const Game = (props) => {
  var createButton = props.userId ? (
    <>
      <div className="create-button">
        <div className="create-text">Quick Create</div>
      </div>
    </>
  ) : (
    <div className="create-button u-pointer" onClick={props.handleLogin}>
      <div className="create-text">Quick Create</div>
    </div>
  );
  var optionsButton = props.userId ? (
    <>
      <div className="options-text">
        <div className="options-text">Advanced Options</div>
      </div>
    </>
  ) : (
    <div className="options-button u-pointer" onClick={props.handleLogin}>
      <div className="options-text">Advanced Options</div>
    </div>
  );
  return (
    <div className="u-flex u-flex-alignCenter u-flex-alignVertical">
      <div id="Game">
        <div className="game-panel">
          <div className="create-game-box">Create a Game</div>
          <div className="join-game-box">Join a Game</div>
          <GameCodeInput />
          {createButton}
          {optionsButton}
          <div className="rand-line"></div>
        </div>
      </div>
    </div>
  );
};

export default Game;
