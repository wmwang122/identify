import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import "./GameChat.css";
import "./InputAnswer.css";

const ChatSubmit = (props) => {
    const [value, setValue] = useState("");
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if(value.trim().length > 0){
            post("/api/chatSubmit",{gameCode: props.gameCode, userId: props.userId, name: props.name, content: value.trim()});
        }
        setValue("");
    }
    const handleKeyPress = (event) => {
        if(event.which === 13){
            if(value.trim().length > 0){
                post("/api/chatSubmit",{gameCode: props.gameCode, userId: props.userId, name: props.name, content: value.trim()});
            }
            setValue("");
        }
    }
  return (
    <div className="answer-inline">
        <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="enter-Text-input"
      />
      <div
        type="submit"
        className="enterText-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </div>
    </div>
  );
};

export default ChatSubmit;