import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import GamePlayer from "./GamePlayer.js";
import "./Scoreboard.css";

const Scoreboard = (props) => {

  return (
    <div>
      <div className="scoreboard-header"> Scores </div>
        {props.data?props.data.map((user) => (
          <GamePlayer user={user} />
        )):<></>}
    </div>
  );
  };
  
  export default Scoreboard;