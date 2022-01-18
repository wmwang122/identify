import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import GamePlayer from "./GamePlayer.js";

const Scoreboard = (props) => {

    return (
      <>
        {props.data.map((user) => (
            <GamePlayer _id={user._id} score={user.score} key={user._id}/>
          ))}
      </>
    );
  };
  
  export default Scoreboard;