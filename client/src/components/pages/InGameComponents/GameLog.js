import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import "./GameLog.css";
import GameLogMessage from "./GameLogMessage.js";

const GameLog = (props) => {
    let content = [];
    let curr = 1;
    for(let i = 0; i < props.messages.length; i++){
        if(props.messages[i].roundNum !== curr){
            curr = props.messages[i].roundNum;
            content.push(<br></br>);
        }
        content.push((<GameLogMessage message={props.messages[i].content}/>));
    }
  return (
    <div className = "game-log-parent">
        <div className = "game-log-container">
            {content}
        </div>
        <div className = "game-log-background"/>
        <div className = "game-log-background"/>
    </div>
  );
};

export default GameLog;
