import React, { Component, useEffect, useState } from "react";
import "../../utilities.css";
import "./InGame.css";
import GamePlayer from "./InGameComponents/GamePlayer.js";
import {get, post} from "../../utilities.js";
import { socket } from "../../client-socket.js";



const InGame = (props) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [userData, setUserData] = useState([{
        _id: "61df83b4d87ebc594c8a6bc6",
        score: 0,
    }]);
    const [userBuzz, setUserBuzz] = useState(null);
    const [userWhoBuzzed, setUserWhoBuzzed] = useState(null);
    const [gameCode, setGameCode] = useState("TEST");
    const handleBuzz = (event) => {
        setUserBuzz(props.userId);
    }
    useEffect(()=>{
        post("/api/gameInitiate",{code: gameCode});
        get("/api/getGame").then((currentBuzz)=>{
            if(currentBuzz)
                setUserWhoBuzzed(currentBuzz); //doesn't work. userBuzz is not initialized the the useEffect kills currentBuzz. TODO
        });
    },[]);
    useEffect(()=>{
        let isMounted = true;
        if(userBuzz){
            if(isMounted){
                get("/api/userLookup",{_id: userBuzz}).then((user) => {
                    setUserWhoBuzzed(user.name);
                    post("/api/buzz",{name: user.name});
                    post("/api/gameUpdateBuzz",{code: gameCode, buzz: userWhoBuzzed});
                });
            }
        }
        return () => { isMounted = false };
    },[userBuzz, userWhoBuzzed]);

    useEffect(() =>{
        const buzzCallback = (value) =>{
            setUserWhoBuzzed(value);
            //setUserBuzz(value);
        };
        socket.on("buzz",buzzCallback);
        return () =>{
            socket.off("buzz",buzzCallback);
        };
    },[])
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
