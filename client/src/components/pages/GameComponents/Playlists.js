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

/*
import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import GamePlayer from "./GamePlayer.js";

const Scoreboard = (props) => {

    return (
      <div>
        {props.data.map((user) => (
            <GamePlayer _id={user._id} score={user.score} key={user._id}/>
          ))}
      </div>
    );
  };
  
  export default Scoreboard;
  */




  // let importantPlaylistInfo = [];
  //   for(let i = 0; i < playlists.length; i++){
  //       importantPlaylistInfo.push( {playlists[i].name};
  //   };

    return (
     <div> 
     {playlists.map((playlist) => (
       <DisplayPlaylist playlistName = {playlist.name} playlistID = {playlist.id} />

     ))}
     </div>
    );
  };




export default Playlists;
