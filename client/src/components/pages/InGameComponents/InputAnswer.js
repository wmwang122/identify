import React, { useState } from "react";
import { get, post } from "../../../utilities.js";
import "./InputAnswer.css";

const InputAnswer = (props) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputText(value);
  };

  const handleKeyPress = (event) => {
    if(event.which === 13){
      props.submit(inputText);
    }
  }

  return (
    <div className="answer-inline">
      <input type="text" value={inputText} onChange={handleInputChange} onKeyPress={handleKeyPress} autoFocus = "autofocus" className="enter-Text-input"/>
      <div onClick={() => props.submit(inputText)} className="enterText-button u-pointer">
        submit
      </div>
      {/* <div> {checkCode(inputText)} </div> */}
  </div>
  );
};

export default InputAnswer;