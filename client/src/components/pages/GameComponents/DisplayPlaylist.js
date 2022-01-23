import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";

const DisplayPlaylist = (props) => {
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const addOrRemove = () => {
      console.log("this is getting called");
      if (selectedPlaylists.indexOf(props.playlistID) === -1) {
          selectedPlaylists.push(props.playlistID);
          console.log("add");
      }
      else {
          let deleteIndex = selectedPlaylists.indexOf(props.playlistID);
          delete selectedPlaylists[deleteIndex];
          console.log("remove");
      }
  }

  return (
    <div onClick={() => addOrRemove()}>
        {props.playlistName}
    </div>
  );
};

export default DisplayPlaylist;
