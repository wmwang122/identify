import React, { useEffect, useState } from "react";
import "./CreateGame.css";
import { navigate } from "@reach/router";
import { get, post } from "../../../utilities.js";
import DisplayPlaylist from "./DisplayPlaylist.js";

// const [gameCode, setGameCode] = useState("");


const Playlists = (props) => {
  const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
      get("/api/playlists", { userId: props.userId }).then((playlistInfo) => {
        setPlaylists(playlistInfo.items);
        console.log(playlistInfo.items);
      });
  }, []);
// use a react component, pass in playlist id and name as props and then display


    return (
     <div> 
     {playlists.map((playlist) => (
       <DisplayPlaylist playlistName = {playlist.name} playlistID = {playlist.id} selectedPlaylists = {props.selectedPlaylists}/>

     ))}
     </div>
    );
  };




export default Playlists;
