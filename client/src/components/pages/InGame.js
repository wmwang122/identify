import React, { Component, useEffect, useState } from "react";
import "../../utilities.css";
import "./InGame.css";
import GamePlayer from "./InGameComponents/GamePlayer.js";
import {get, post} from "../../utilities.js";


const InGame = (props) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [userData, setUserData] = useState([{
        _id: "61df83b4d87ebc594c8a6bc6",
        score: 0,
    }]);
    const [userBuzz, setUserBuzz] = useState(null);
    const [userWhoBuzzed, setUserWhoBuzzed] = useState(null);
    console.log(JSON.stringify(userData));
    const handleBuzz = (event) => {
        setUserBuzz(props.userId);
    }
    useEffect(()=>{
        let isMounted = true;
        if(userBuzz){
            if(isMounted){
                get("/api/userLookup",{_id: userBuzz}).then((user) => {
                    setUserWhoBuzzed(user.name);
                });
            }
        }
        return () => { isMounted = false };
    },[userBuzz]);
    var whoBuzzed=userBuzz?(
        <div>
            {userWhoBuzzed} has buzzed!
        </div>
    ):(
        <div>

        </div>
    );
  return (
    <div className="inGame-container">
        <div className="inGame-container-left">
            <div>
                {userData.map((user)=>(<GamePlayer _id = {user._id} score = {user.score}/>))}
            </div>
            <div>
                Add music
            </div>
        </div>
        <div className="inGame-container-right">
            <div>
                Room name
            </div>
            <audio controls="controls">
                <source src="https://p.scdn.co/mp3-preview/83090a4db6899eaca689ae35f69126dbe65d94c9?cid=null" type="audio/mpeg"/>
            </audio>
            <div 
                className="game-buzzer u-background-brightgreen u-pointer u-noSelect"
                onClick={handleBuzz}
            >
                buzz
            </div>
            {whoBuzzed}
        </div>
    </div>
  );
};
//TODOOOOO
export default InGame;
