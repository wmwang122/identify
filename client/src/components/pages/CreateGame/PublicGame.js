import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { get, post } from "../../../utilities.js";

const PublicGame = (props) => {
  const [userData, setUserData] = useState(null);

  get("/api/getGameData", { code: gameCode }).then((data) => {
    setUserData(data.userData);
  });
  let host = "";
  if (userData) {
    host = userData.name;
  }

  return (
    <>
      <div className="game-panel">
        <div className="host-participants">Host: {host} | Participants: 1</div>
        <div className="code-in-game-panel">{props.code}</div>
      </div>
    </>
  );
};

export default PublicGame;
