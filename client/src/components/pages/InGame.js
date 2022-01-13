import React, { Component } from "react";
import "../../utilities.css";
import "./Game.css";
import Players from "./InGameComponents/Players.js";

const InGame = (userId) => {
  return (
    <div>
        <div>
            <Players/>
            <div>
                Add music
            </div>
        </div>
        <div>
            <div>
                Room name
            </div>
            <div>
                song stuff
            </div>
            <div>
                buzz
            </div>
        </div>
    </div>
  );
};
//TODOOOOO
export default InGame;
