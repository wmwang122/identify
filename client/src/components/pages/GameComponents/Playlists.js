import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { get, post } from "../../../utilities.js";
import DisplayPlaylist from "./DisplayPlaylist.js";
import "./Playlists.css"

// const [gameCode, setGameCode] = useState("");


const Playlists = (props) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState(null);
    useEffect(() => {
      get("/api/playlists", { userId: props.userId }).then((playlistInfo) => {
        setPlaylists(playlistInfo.items);
        setSelectedPlaylists([]);
      });
  }, []);

  useEffect(()=>{
    props.setSelected(null);
  },[]);
// use a react component, pass in playlist id and name as props and then display


    return (
     <div className = "playlists-box"> 
     {playlists.map((playlist) => (
       <DisplayPlaylist playlistImage = {playlist.images[0]} playlistName = {playlist.name} playlistID = {playlist.id} selectedPlaylists = {selectedPlaylists} setSelected = {props.setSelected}/>
     ))}
     </div>
    );
  };




export default Playlists;
