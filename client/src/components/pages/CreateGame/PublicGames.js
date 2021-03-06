import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { get, post } from "../../../utilities.js";
import { socket } from "../../../client-socket.js";
import "./PublicGames.css"
import PublicGame from "./PublicGame.js";

const PublicGames = (props) => {
  const [publicCodes, setPublicCodes] = useState([]);
  let publicGames = [];
  useEffect(() => {
    get("/api/getPublicCodes",{}).then(
      (data) => {
        setPublicCodes(data);
      }
    );
  });
  useEffect(() => {
    socket.on("new public game", (code) => {
      setPublicCodes([...publicCodes, code]);
    });
    return () => {
      socket.off("new public game");
    };
  });

  useEffect(()=>{
    socket.on("public game delete", (code) => {
      let i = publicCodes.indexOf(code);
      if(i!==-1){
        publicCodes.splice(i,1);
      }
    });
    return () => {
      socket.off("public game delete");
    };
  });

  useEffect(()=> {
    socket.on("public game end", (code) => {
      for(let i = 0; i < publicCodes.length; i++){
        if(publicCodes[i]===code){
          setPublicCodes(publicCodes.splice(i,1));
          break;
        }
      }
    });
    return () => {
      socket.off("public game end");
    };
  });

  for (let i = publicCodes.length-1; i >=0; i--) {
    publicGames.push(<PublicGame code={publicCodes[i]} userId={props.userId} name={props.name}/>);
  }

  return (
    <>
      <div className="public-game-heading">Public Games</div>
      <div className="public-games-container">{publicGames}</div>
    </>
  );
};

export default PublicGames;
