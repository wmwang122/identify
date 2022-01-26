import React, { Component, useEffect, useState, useRef } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import "./GameChat.css";
import ChatMessage from "./ChatMessage.js";
import ChatSubmit from "./ChatSubmit.js";

const GameChat = (props) => {
    // let [messagesEnd, setMessagesEnd] = useState({});

    const messagesEndRef = useRef(null);

    const renderContent = () => {
      let content = [];
      for(let i = 0; i < props.messages.length; i++){
          content.push((<ChatMessage message={props.messages[i]} userId={props.userId}/>));
      }
      return content
    }

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({behavior: "smooth"}); 
    }

    useEffect(() => {
      scrollToBottom();
    }, [props.messages]);

  return (
    <div className = "chat-big-container">
        <div className="chat-content-container">
            {renderContent()}
            <div ref={messagesEndRef}>
          </div>
        </div>
        <ChatSubmit gameCode={props.gameCode} userId={props.userId} name={props.name}/>
    </div>
  );
};

export default GameChat;
