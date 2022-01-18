import React, { useState } from "react";
import "./CreateGame.css";
import { Link } from "@reach/router";



const CreateGame = (props) => {
    let gameCode = "";

    const startGame = () => {
      console.log("Game will be started!")
      gameCode = generateCode(5);
      
    }

    const generateCode = (length) => {
      var code = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      for ( let i = 0; i < length; i++ ) {
        code += characters.charAt(Math.floor(Math.random() * 
        characters.length));
     }
     return code;


    }

    return (
      <div className="create-button u-pointer" >
        <div className="create-text" onClick={startGame}>
          <Link to={"/"+gameCode}>
            Quick Create
          </Link>
          </div>
      </div>
    );
}

export default CreateGame;