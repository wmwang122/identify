import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import "./SongDisplay.css";

const SongDisplay = (props) => {
    const [added, setAdded] = useState(false);

    let artistString = "";
    for(let i = 0; i < props.song.artists.length; i++){
        artistString += props.song.artists[i].name;
        if(i != props.song.artists.length-1){
            artistString += ", ";
        }
    }

    const handleAddSong = () => {
        props.handleAddSong(props.song);
        setAdded(true);
    }
    return (
      <div className = "songDisplay-container">
        <div className = "songDisplay-info">
            <div className = "songDisplay-songName">
                {props.song.name}
            </div>
            <div className = "songDisplay-songArtists">
                {artistString}
            </div>
        </div>
        {added?(<div className = "songDisplay-added" onClick = {() => handleAddSong()}>
            added
        </div>):(
        <div className = "songDisplay-add u-pointer" onClick = {() => handleAddSong()}>
            add
        </div>)
        }
      </div>
    );
  };
  
  export default SongDisplay;