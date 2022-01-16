import { get } from "core-js/core/dict";
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
    let roomName = inputText;
  };
    


  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={setText} className="enterText-button">
        {" "}
        submit{" "}
          </button>
    </div>
  );
};

export default RoomNameInput;
