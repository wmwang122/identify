import React, { useState } from "react";
import "./CreateGame.css";
import { navigate } from "@reach/router";
import { get, post } from "../../../utilities.js";

// const [gameCode, setGameCode] = useState("");

const CreateGame = (props) => {
  const startGame = () => {
    let settings = {isPublic:true, wantsOwnPlaylist:true, numberQuestions:10, time:10, playlistIDs:[]};
    console.log("Game will be started!");
    post("/api/newGame", {
      userId: props.userId,
      settings: settings,
      hostName: props.name,
      name: props.name,
    }).then((gameStuff) => {
      console.log(gameStuff.games);
      console.log(gameStuff.gameCode);
      navigate(`/game/${gameStuff.gameCode}`, { state: gameStuff });
    });
    // gameCode = generateCode(5);
    // console.log(gameCode);
    // while (True) {
    //   get("/api/getGame", { gameCode: gameCode }).then(gameStatus => {
    //     if (gameStatus === "No game") {
    //       post("/api/newGame", { code: gameCode });
    //       return;
    //     }
    //   })
    // }
  };

  return (
    <div className="create-button2 u-pointer" onClick={startGame}>
      <div className="create-text">
        Quick Create
      </div>
    </div>
  );
};

export default CreateGame;
