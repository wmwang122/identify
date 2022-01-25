import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import { Link } from "@reach/router";
import "./GameEndScreen.css";
import SongInfo from "./SongInfo.js";

const GameEndScreen = (props) => {
    let leaderboard = [];
    for(let i = 0; i < props.leaderboard.length; i++){
        leaderboard.push(<div className="gameEnd-leaderboard-entry"><div className="gameEnd-leaderboard-name">{(i+1)+". " }{props.leaderboard[i].name}</div>
        <div className="gameEnd-leaderboard-score">
            Score: {props.leaderboard[i].score}
        </div>
        </div>);
    }
    let savedSongList = [];
    for(let i = 0; i < props.savedSongs.length; i++){
        savedSongList.push(<SongInfo
            song={props.trackList[props.savedSongs[i]]}/>)
    }
    if(savedSongList.length===0){
        savedSongList.push(<div className = "gameEnd-noSavedSongs-text">
            You had no saved songs this game. If you like what you hear during a round, you can click the save song button after it's over, and it'll appear here after the game for you to save!
        </div>)
    }
    return (
    <>
      <div className="firstdiv">
      </div>
      <div className="gameEndScreen-popup">
          <div className = "gameEnd-content-container">
          <div className="gameEnd-leaderboard-title">
              Final Rankings
          </div>
          <div className="gameEnd-leaderboard-content">
              {leaderboard}
          </div>
          <div className="gameEnd-savedSongs-title">
              Your Saved Songs
          </div>
          <div className="gameEnd-savedSongs-content">
              {savedSongList}
          </div>
          </div>
          <div className="gameEnd-button u-pointer">
            <Link to="/lobby">
                leave game
            </Link>
          </div>
      </div>
      </>
    );
  };
  
  export default GameEndScreen;