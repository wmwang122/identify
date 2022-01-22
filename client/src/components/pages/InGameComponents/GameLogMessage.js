import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import "./GameLog.css";

const GameLogMessage = (props) => {
  return (
    <div className = "game-log-message">
        {props.message}
    </div>
  );
};

export default GameLogMessage;
