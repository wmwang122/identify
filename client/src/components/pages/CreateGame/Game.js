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
    <div className ="gamePage-container">
        <div className="gameJoin-container">
      <div className = "createGame-panel">
        <div className = "create-game-text">create a new game</div>
        <div className="actual-buttons">
            <CreateGame userId = {props.userId} name= {props.name}/>
            <Options userId = {props.userId} name = {props.name}/>
          </div>
      </div>
      <div className = "joinGame-container">
      <div className = "joinGame-panel">
      <div className="join-game-box">
              <div className = "join-game-text"> join a game </div>
              <div className = "join-game-input-container">code: <div>
                <GameCodeInput userId={props.userId} name={props.name}/>
              </div></div>
          {/* </div> */}
          </div> 
      </div>
      <div className = "joinGame-description">
      Either create a game on the left, join a game using a code above, or browse all the public games below! Make sure to read the instructions before you play. Hope you have fun!
      </div>
      </div>
    </div>
        <PublicGames/>  
    </div>
  );
};

export default Game;
