import React, { Component, useEffect } from "react";
import "../../../utilities.css";
import "./Game.css";
import GameCodeInput from "./GameCodeInput.js";
import CreateGame from "../GameComponents/CreateGame.js";
import AdvancedOptions from "../GameComponents/AdvancedOptions.js";
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
    <div className="u-flex u-flex-alignCenter u-flex-alignVertical">
      <div id="Game">
        <div className="game-panel">
          {/* <div className="buttons"> */}
            <div className="create">
              <div className="create-game-box">Create a Game</div>
                <div className="actual-buttons">
                  <CreateGame/>
                  <AdvancedOptions/>
                </div>
            </div>
            <div className="rand-line"></div>
            <div className="join">
              <div className="join-game-box">
              <div> Join a Game </div>
              <div className="enterGameCode"> enter game code: </div>
              <div className="enterCode-button">
                <GameCodeInput userId={props.userId}/>
              </div>
          {/* </div> */}
          </div> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
