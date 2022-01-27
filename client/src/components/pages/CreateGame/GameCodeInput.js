import React, { useState } from "react";
import "./GameCodeInput.css";
import { get, post } from "../../../utilities.js";
import { navigate } from "@reach/router";

const GameCodeInput = (props) => {
  const [inputText, setInputText] = useState("");
  const [invalid, setInvalid] = useState("false");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputText(value);
  };

  const setText = () => {
    let gameCode = inputText;
    console.log(gameCode);
  };

  const checkCode = () => {
    post("/api/joinGame", {
      gameCode: inputText.toUpperCase(),
      userId: props.userId,
      name: props.name,
    }).then((gameInfo) => {
      console.log(gameInfo.status);
      if (gameInfo.status !== "game not found") {
        navigate(`/game/${gameInfo.gameCode}`, { state: gameInfo });
      } else {
        console.log(invalid);
        setInvalid("true");
        setInputText("");
      }
    });
  };

  const handleKeyPress = (event) => {
    if(event.which === 13){
      checkCode();
    }
  }

  let textBox =
    invalid === "true" ? (
      <div className="invalid">invalid game code, please try again</div>
    ) : (
      <> </>
    );

  return (
    <div className="invalidColumn">
      <div className="gameCodeinline">
        <div className="submitTextCode">code: </div>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress = {handleKeyPress}
          maxLength="5"
          className="join-game-input"
        />
        <div onClick={checkCode} className="enterCode-button u-pointer">
          <div className="submitText">submit</div>
        </div>
      </div>
      <div onClick={checkCode} className="enterCode-button2 u-pointer">
          <div className="submitText">submit</div>
        </div>
      {textBox}
    </div>
  );
};

export default GameCodeInput;
