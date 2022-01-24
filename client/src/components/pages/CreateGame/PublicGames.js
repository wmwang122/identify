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

  for (let i = 0; i < publicCodes.length; i++) {
    publicGames.push(<PublicGame code={publicCodes[i]} />);
  }

  return (
    <>
      <div className="public-game-heading">Public Games</div>
      <div className="public-games-container">{publicGames}</div>
    </>
  );
};

export default PublicGames;
