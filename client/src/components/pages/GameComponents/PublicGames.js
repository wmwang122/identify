import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { get, post } from "../../../utilities.js";

const PublicGames = (props) => {
  const [publicCodes, setPublicCodes] = useState([]);
  let publicGames = [];
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
