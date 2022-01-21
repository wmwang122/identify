import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import "./ChatMessage.css";

const ChatMessage = (props) => {
    return (
        <div className = "chatMessage">
            <div className = "chatName">
                {props.message.name}
            </div>
            <div className = "chatContent">
                {props.message.content}
            </div>
        </div>
    );
};

export default ChatMessage;
