import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import GamePlayer from "./GamePlayer.js";

const Scoreboard = (props) => {

    return (
      <div>
        {props.data.map((user) => (
            <GamePlayer user = {user}/>
          ))}
      </div>
    );
  };
  
  export default Scoreboard;