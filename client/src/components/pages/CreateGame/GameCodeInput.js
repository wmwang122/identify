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
    post("/api/joinGame", { gameCode: inputText, userId: props.userId,}).then((gameInfo) => {
      console.log(gameInfo.status);
      if (gameInfo.status === "game found") {
        navigate(`/game/${gameInfo.gameCode}`, { state: gameInfo });
      } else {
        console.log(invalid);
        setInvalid("true");
        setInputText("");
      }
    });
    //  console.log(inputText);
  };

    var textBox =
      invalid === "true" ? (
        <div className = "invalid">
          invalid game code, please try again
        </div>
      ) : (
        <> </>
      );

  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={checkCode} className="enterText-button">
        {" "}
        submit{" "}
      </button>
      {textBox}
    </div>
  );
};

export default GameCodeInput;
