import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import GamePlayer from "./GamePlayer.js";
import "./SaveButton.css";

const SaveButton = (props) => {
    const [saved, setSaved] = useState(false);
    const handleSaveSong = () => {
        setSaved(true);
        props.handle();
    };
    return (
        saved ? (
            <div className="save-button-end-no-hover">
              song saved
            </div>
          ) : (
            <div className="save-button-end u-pointer" onClick={() => handleSaveSong()}>
              save song for later
            </div>
        )
    );
  };
  
  export default SaveButton;