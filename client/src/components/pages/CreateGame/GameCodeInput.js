import React, { useState } from "react";
import "./GameCodeInput.css";
import { get, post } from "../../../utilities.js";
import { navigate } from "@reach/router";

const GameCodeInput = (props) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputText(value);
  };

  const setText = () => {
    let gameCode = inputText;
    console.log(gameCode);
  };

  const checkCode = () => {
    post("/api/joinGame", { gameCode: inputText }).then((gameInfo) => {
      console.log(gameInfo.status);
      if (gameInfo.status === "game found") {
        navigate(`/game/${gameInfo.gameCode}`, { state: gameInfo });
      } else {
        console.log("game not found");
      }
    });
    //  console.log(inputText);
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={checkCode} className="enterText-button">
        {" "}
        submit{" "}
      </button>
      {/* <div> {checkCode(inputText)} </div> */}
    </div>
  );
};

export default GameCodeInput;
