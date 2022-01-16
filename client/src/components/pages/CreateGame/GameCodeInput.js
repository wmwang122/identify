import React, { useState } from "react";
import "./GameCodeInput.css";
import { get, post } from "../../../utilities.js";

const GameCodeInput = (props) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputText(value);
  };

  const setText = () => {
    let gamecode = inputText;
    console.log(gamecode);
  };

  const checkCode = () => {
    get("/api/getGame", { gameCode: inputText }).then((gameCode) => console.log(gameCode));
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
