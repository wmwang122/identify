import React, { useState } from "react";
import "./CreateGame.css";
import { navigate } from "@reach/router";
import { get, post } from "../../../utilities.js";


// const [gameCode, setGameCode] = useState("");

const CreateGame = (props) => {


  const startGame = () => {
      let settings = [false, false, 10, 10, false];
      console.log("Game will be started!")
      post("/api/newGame", {userId: props.userId, settings: settings, host:props.userId}).then((gameStuff) => {
        console.log(gameStuff.games);
        console.log(gameStuff.gameCode);
        navigate(`/game/${gameStuff.gameCode}`, { state: gameStuff, });
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
    }

    

    return (
      <div className="create-button u-pointer" >
        <div className="create-text" onClick={startGame}>
          {/* <Link to={"/game/"+gameCode}> */}
            Quick Create
          {/* </Link> */}
          </div>
      </div>
    );
}

export default CreateGame;