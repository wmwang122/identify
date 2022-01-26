import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import "./GamePlayer.css";

const GamePlayer = (props) => {
  const [userName, setUserName] = useState(null);
  const [profileId, setProfileId] = useState(null);
  useEffect(() => {
    let isMounted = true;
    if(isMounted){
        get("/api/userLookup",{_id: props.user._id}).then((user) => {
            setUserName(user.name);
        });
    }
    return () => { isMounted = false };
  },[]);

  useEffect(()=>{
    if(!profileId){
      get("/api/getProfileId", {_id: props.user._id}).then((id) =>{
        setProfileId(id);
      });
    }
  },[]);

  return (
      <div className ={props.user.buzzed?"gamePlayer-buzzed":""}>
        <a href={"/profile/"+profileId} target="_blank">
          <div className={"gamePlayer-name"}>
            {userName}
          </div>
        </a>
        <div className={"gamePlayer-score"}>
          {props.user.score}
        </div>
      </div>
  );
};

export default GamePlayer;
