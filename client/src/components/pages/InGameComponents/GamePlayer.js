import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import "./GamePlayer.css";

const GamePlayer = (props) => {
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    let isMounted = true;
    if(isMounted){
        get("/api/userLookup",{_id: props._id}).then((user) => {
            setUserName(user.name);
        });
    }
    return () => { isMounted = false };
  },[]);

  return (
    <div>
      <div className="gamePlayer-name">
        {userName}
      </div>
      <div className="gamePlayer-score">
        {props.score}
      </div>
    </div>
  );
};

export default GamePlayer;
