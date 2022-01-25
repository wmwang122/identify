import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";

const DisplayPlaylist = (props) => {
//  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const addOrRemove = () => {
      console.log(props.selectedPlaylists);
      console.log("this is getting called");
      if (props.selectedPlaylists.indexOf(props.playlistID) === -1) {
          props.selectedPlaylists.push(props.playlistID);
          console.log("add");
      }
      else {
          let deleteIndex = props.selectedPlaylists.indexOf(props.playlistID);
          delete props.selectedPlaylists[deleteIndex];
          console.log("remove");
      }
  }

  return (
    <div onClick={() => addOrRemove()} className = "column">
    <div> {props.playlistName} </div>
    <div>    <img src={props.playlistImage.url} width="100" height="100"/> </div>
    </div>
  );
};

export default DisplayPlaylist;
