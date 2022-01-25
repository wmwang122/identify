import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { get, post } from "../../../utilities.js";
import "./PublicGame.css";
import { socket } from "../../../client-socket.js";

const PublicGame = (props) => {
  const [data, setData] = useState(null);
  const [participants, setParticipants] =useState(1);
  useEffect(()=>{
    get("/api/getGameData", { code: props.code }).then((data) => {
      console.log("received");
      setData(data);
      setParticipants(data.userData.length);
    });
  },[]);
  let host = "";

  useEffect(() => {
    socket.on("player joining", (data) => {
      console.log(data);
      if(data.gameCode === props.code){
        console.log("matched!");
        setParticipants(participants+1);
      }
    });
    return () => {
      socket.off("player joining");
    };
  });

  if (data) {
    host = data.hostName;
  }

  return (
    <div className="public-game-container">
      <div className="host-participants">Host: {host} | Participants: {participants}</div>
      <div className="code-in-game-panel">{props.code}</div>
    </div>
  );
};

export default PublicGame;
