import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { get, post } from "../../../utilities.js";
import "./PublicGame.css";

const PublicGame = (props) => {
  const [userData, setUserData] = useState(null);
  useEffect(()=>{
    get("/api/getGameData", { code: props.code }).then((data) => {
      console.log("received");
      setUserData(data);
      console.log(JSON.stringify(data));
    });
  },[]);
  let host = "";
  if (userData) {
    host = userData.hostName;
  }

  return (
    <div className="public-game-container">
      <div className="host-participants">Host: {host} | Participants: 1</div>
      <div className="code-in-game-panel">{props.code}</div>
    </div>
  );
};

export default PublicGame;
