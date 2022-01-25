import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import { get, post } from "../../../utilities.js";
import "./SongDisplay1.css";

const SongDisplay1 = (props) => {
  const [selected, setSelected] = useState(false);

  useEffect(()=>{
    setSelected(false);
  },[props.song]);

  let artistString = "";
  for (let i = 0; i < props.song.artists.length; i++) {
    artistString += props.song.artists[i].name;
    if (i != props.song.artists.length - 1) {
      artistString += ", ";
    }
  }

  const handleAddOrRemoveSong = () => {
    console.log(props.song.name);
    let flag = true;
    for(let i = 0; i < props.selectedSongs.length; i++){
      if(props.selectedSongs[i].id === props.song.id){
        props.selectedSongs.splice(i,1);
        setSelected(false);
        flag = false;
        break;
      }
    }
    if(flag){
      props.selectedSongs.push(props.song);
      setSelected(true);
    }
    props.setSelected({
      type: "select",
      selectedSongs: props.selectedSongs,
    });
  };

  return (
    <div className="songDisplay-container">
      <div className="songDisplay-info">
        <div className="songDisplay-songName">{props.song.name}</div>
        <div className="songDisplay-songArtists">{artistString}</div>
      </div>
      <div className="songDisplay-add u-pointer" onClick={() => handleAddOrRemoveSong()}>
        {selected?"remove":"add"}
      </div>
    </div>
  );
};

export default SongDisplay1;
