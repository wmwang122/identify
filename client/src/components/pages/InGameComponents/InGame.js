import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import "./InGame.css";
import GamePlayer from "./GamePlayer.js";
import {get, post} from "../../../utilities.js";
import { socket } from "../../../client-socket.js";



const InGame = (props) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [userData, setUserData] = useState([{
        _id: "61df83b4d87ebc594c8a6bc6",
        score: 0,
    }]);
    const [userBuzz, setUserBuzz] = useState(null); 
    const [userWhoBuzzed, setUserWhoBuzzed] = useState(null); //unnecesssary, just returns name instead of id
    const handleBuzz = (event) => {
        post("/api/buzz", { userId: props.userId });
        console.log("person buzzed");
    }

        useEffect(() => {
          console.log("useeffect");
          socket.on("buzz", newBuzz);
          return () => {
            socket.off("buzz", newBuzz);
          };
        }, []);

    const newBuzz = (userId) => {
        get("/api/userLookup", { _id: userId }).then((user) =>
        {
            setUserWhoBuzzed(user.name);
    }
    )
        setUserBuzz(userId);
    }

    var whoBuzzed=userBuzz?(
        <div>
            {userWhoBuzzed} has buzzed!
        </div>
    ):(
        <div>
            No one has buzzed!
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
