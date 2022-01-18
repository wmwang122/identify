import React, { useState } from "react";
import { get, post } from "../../../utilities.js";
import "./InputAnswer.css";

const InputAnswer = (props) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputText(value);
  };

  const setUserAnswer = () => {
    let userAnswer = inputText;
    console.log(gamecode);
  };

  const checkAnswer = () => {
      console.log("checking answer");
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={props.submit(inputText)} className="enterText-button">
        submit
      </button>
      {/* <div> {checkCode(inputText)} </div> */}
    </div>
  );
};

export default InputAnswer;