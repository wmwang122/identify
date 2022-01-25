import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import "./SongInfo.css";

const SongInfo = (props) => {
    const [name, setName] = useState("");
    const [artists, setArtists] = useState([]);
    const [time, setTime] = useState([]);
    useEffect(()=>{
        setName(props.song.name);
        setArtists(props.song.artists);
        setTime(Math.floor(props.song.duration_ms/1000));
    },[props]);
    let hour = Math.floor(time/3600);
    let curr = time-hour*3600;
    let minute = Math.floor(curr/60);
    let second = curr-minute*60;
    let timeString = hour?(hour+":"+(minute>9?minute:"0"+minute)+":"+(second>9?second:"0"+second)):minute+":"+(second>9?second:"0"+second);
    let artistString="";
    for(let i = 0; i < artists.length; i++ ){
        artistString += artists[i].name;
        if(i < artists.length-1){
            artistString += ", ";
        }
    }
    if(name.length > 14){
      setName(name.substring(0,11)+"...");
    }
    if(artistString.length > 16){
      artistString = artistString.substring(0,13)+"...";
    }
    return (
      <a href={props.song.external_urls.spotify} target="_blank" className="songInfo-link">
      <div className="songInfo-container">
          <div className="songInfo-left">
            <img src={props.song.album.images[0].url} className = "songInfo-image"/>
            <div className = "songInfo-text">
              <div className="songInfo-name">
                {name}
              </div>
              <div className="songInfo-artists">
                {artistString}
              </div>
            </div>
          </div>
          <div className="songInfo-right">
            {timeString}
          </div>
      </div>
      </a>
    );
  };
  
  export default SongInfo;