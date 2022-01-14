import React, { useState } from "react";
import "./GameCodeInput.css";



const GameCodeInput = (props) => {
    const [inputText, setInputText] = useState("");

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputText(value)

    };

    const setCode = () => {
        let gamecode = inputText
        console.log(gamecode)
    }

    return (
      <div>
            <input type="text" value={inputText} onChange={handleInputChange} />
            <button onClick={setCode} className = "enterCode-button"> submit </button>
      </div>
    );
}

export default GameCodeInput;