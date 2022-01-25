import React, { Component, useEffect } from "react";
import "../../../utilities.css";
import "./Game.css";
import GameCodeInput from "./GameCodeInput.js";
import CreateGame from "../GameComponents/CreateGame.js";
import Options from "../GameComponents/Options.js";
import PublicGames from "./PublicGames.js";
const Game = (props) => {
  /*var optionsButton = props.userId ? (
    <>
      <div className="options-button">
        <div className="options-text">Advanced Options</div>
      </div>
    </>
  ) : (
    <div className="options-button u-pointer" onClick={props.userId}>
      <div className="options-text">Advanced Options</div>
    </div>
  ); */
  
  return (
    <div className="gamePage-container">
      <div className="gameJoin-container">
        <div className="createGame-panel">
          <div className="create-game-text">Create a New Game</div>
          <div className="row">
            <div className="column">
              <div className="actual-buttons">
                <CreateGame userId={props.userId} name={props.name} />
              </div>
            </div>
            <div classsName="column">
              <div className="actual-buttons">
                <Options userId={props.userId} name={props.name} />
              </div>
            </div>
          </div>
        </div>
        <div className="joinGame-container">
          <div className="joinGame-panel">
            <div className="join-game-box">
              <div className="join-game-text"> Join a Game </div>
              <div>
                <GameCodeInput userId={props.userId} name={props.name} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="publicGames">
        <PublicGames userId={props.userId} name={props.name} />{" "}
      </div>
    </div>
  );
};

export default Game;
