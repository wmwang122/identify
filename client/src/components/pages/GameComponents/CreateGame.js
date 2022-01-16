import React, { useState } from "react";
import "./CreateGame.css";
import { Link } from "@reach/router";



const CreateGame = (props) => {

    const startGame = () => {
      console.log("Game will be started!")
      
    }

    return (
      <div className="create-button u-pointer" >
        <div className="create-text" onClick={startGame}>
          <Link to="/gametesting">
            Quick Create
          </Link>
          </div>
      </div>
    );
}

export default CreateGame;