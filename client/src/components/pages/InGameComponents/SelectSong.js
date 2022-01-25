import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import "./SelectSong.css";
import SongDisplay from "./SongDisplay.js"

const SelectSong = (props) => {
    const [value, setValue] = useState("");
    const [songArray, setSongArray] = useState([]);
    const [selecting, setSelecting] = useState(false);
    let output = [];
    for(let i = 0; i < songArray.length; i++){
        output.push(<SongDisplay song={songArray[i]} handleAddSong = {(song)=>props.handleAddSong(song)}/>);
    }
    let popUp = selecting ? (
      <>
        <div className="firstdiv" />
        <div className="select-song-window">
          <div className="selectPopup-header">
            <div className="selectSonginline">
              <input
                type="text"
                placeholder={props.defaultText}
                value={value}
                onChange={(data) => handleChange(data)}
                className="displayInLine"
              />
              <div className="searchButton u-pointer displayInLine" onClick={() => handleSubmit()}>
                <div className="searchButton-text">search </div>
              </div>
            </div>
          </div>
          <div className="selectPopup-content">{output}</div>
          <div className="selectPopup-footer">
            <div className="close-select-button u-pointer" onClick={() => handleCloseSelect()}>
              Close
            </div>
          </div>
        </div>
      </>
    ) : (
      <></>
    );
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    
    const handleSubmit = () => {
        get("/api/searchSpotify", {query: value}).then((data) => {
            setSongArray(data);
        });
    }
    const handleCloseSelect = () => {
        setSelecting(false);
    }

    const handleOpenSelect = () => {
        setSelecting(true);
    }


    return (
        <>
        <div className = "selectSong-add-music u-pointer" onClick = {() =>handleOpenSelect()}>
            Add Music
        </div>
      {popUp}
      </>
    );
  };
  
  export default SelectSong;