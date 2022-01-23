import React, { useEffect, useState } from "react";
import "./CreateGame.css";
import { navigate } from "@reach/router";
import { get, post } from "../../../utilities.js";

// const [gameCode, setGameCode] = useState("");


const Playlists = (props) => {
  const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
      get("/api/playlists", { userId: props.userId }).then((playlistInfo) => {
        setPlaylists(playlistInfo.items);
      });
    }, []);
  
  
 /* let title_image = playlists.map(
    <span>{playlists.name}</span>
     );*/
  
  
  
    return (
      <div className="create-button u-pointer">
        <div className="create-text" >
          
        </div>
      </div>
    );
 
  };




export default Playlists;
