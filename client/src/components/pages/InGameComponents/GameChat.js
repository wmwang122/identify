import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import "./GameChat.css";
import ChatMessage from "./ChatMessage.js";
import ChatSubmit from "./ChatSubmit.js";

const GameChat = (props) => {
    let content = [];
    for(let i = 0; i < props.messages.length; i++){
        content.push((<ChatMessage message={props.messages[i]} userId={props.userId}/>));
    }
  return (
    <div className = "chat-big-container">
        <div className="chat-content-container">
            {content}
        </div>
        <ChatSubmit gameCode={props.gameCode} userId={props.userId} name={props.name}/>
    </div>
  );
};

export default GameChat;
