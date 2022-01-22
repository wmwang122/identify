import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import "./InGame.css";
import GamePlayer from "./GamePlayer.js";
import Scoreboard from "./Scoreboard.js";
import Countdown from "./Countdown.js";
import { get, post } from "../../../utilities.js";
import { socket } from "../../../client-socket.js";
import SongPlayer from "./SongPlayer.js";
import InputAnswer from "./InputAnswer.js";
import GameChat from "./GameChat.js";
import Name from "../Home/Name.js";

const InGame = (props) => {
  const [userData, setUserData] = useState([
  ]);
  const [userBuzz, setUserBuzz] = useState(null);
  const [trackList, setTrackList] = useState(null);
  const [trackNum, setTrackNum] = useState(1);
  const [myAudio, setMyAudio] = useState(null);
  const [playingNum, setPlayingNum] = useState(null);
  const [resetTimer, setResetTimer] = useState(false);
  const [roundOngoing, setRoundOngoing] = useState(false);
  const [canBuzz, setCanBuzz] = useState(false);
  const [gameChat, setGameChat] = useState([]);
  const [buzzTime, setBuzzTime] = useState(5);

    let answerVer = (<div>Placeholder</div>);
    let val = window.location.href;
    let gameCode = (val.substring(val.length - 5, val.length));

  const handleBuzz = async (event) => {
    if(roundOngoing && !userBuzz){
        post("/api/buzz", { userId: props.userId, gameCode: gameCode, }); 
        myAudio.pause();
      }

  }

  const initialize = () => {
    get("/api/getGameData",{code: gameCode}).then((data) => {
      setUserData(data.userData);
      setUserBuzz(data.userBuzz);
      console.log("user: " + data.userBuzz);
      setGameChat(data.gameChat);
      setTrackNum(data.trackNum);
      setBuzzTime(data.settings.time?data.settings.time:5);
      //setTrackList(data.trackList?data.trackList:null);
      //setTrackNum(data.trackNum?data.trackNum:1);
      //setRoundOngoing(data.roundOngoing?data.roundOngoing: null);
    });
  }

  useEffect(() =>{
    for(let i =0; i < userData.length; i++){
      if(!userData[i].name){
        get("/api/userLookup",{_id: userData[i]._id}).then((user) => {
          userData[i].name = user.name;
        });
      }
    }
  },[userData]);

  useEffect(() =>{
    initialize();
  },[]);
    
  useEffect(() => {
    if(!trackList){
      get("/api/testPlaylists").then((body) => {
        setTrackList(body.tracks.items);
        setTrackNum(1);
      });
    }
  },[]);

  useEffect(()=> {
    socket.on("new message", (message) => {
      setGameChat([... gameChat, message]);
    });
    return () => {
      socket.off("new message");
    }
  });

  useEffect(()=> {
    socket.on("buzz", newBuzz);
    return () => {
      socket.off("buzz");
    };
  });
    
  useEffect(() => {
      socket.on("new player", addData);
    return () => {
      socket.off("new player");
    };
  });

  useEffect(() => {
    socket.on("submitted", handleSubmit);
  return () => {
    socket.off("submitted");
  };
});

useEffect(() => {
  socket.on("starting", handleRoundStartedByUser);
  return () => {
    socket.off("starting");
  };
});

useEffect(()=>{
  if(userBuzz){
    setCanBuzz(false);
  }
  else if(roundOngoing){
    setCanBuzz(true);
  }
  else{
    setCanBuzz(false);
  }
},[roundOngoing, userBuzz]);

  const addData = (userId) => {
    setUserData([... userData,{_id: userId, score:0}]);
  }
    
  const newBuzz = (userId) => {
    let found = false;
    for(let i=0; i < userData.length; i++){
      if(userData[i]._id===userId){
        found = true;
        setUserBuzz(userData[i]);
        console.log("user2: " + JSON.stringify(userData[i]));
        break;
      }
    }
    if(!found){
      console.log("error");
    }
    myAudio.pause();
  };

  const handleTimerEnd = async (success) => {
    setUserBuzz(null);
    if(success){
      for(let i = 0; i < userData.length; i++){
        if(userData[i]._id === userBuzz._id){
          userData[i].score++;
          break;
        }
      }
    }
    await post("/api/clearBuzz",{gameCode: gameCode});
    if(typeof success !== undefined && myAudio){
      success ? myAudio.pause() : myAudio.play();
    }
    else if(myAudio){
      myAudio.pause();
    }
    if(success && trackNum){
      setTrackNum(trackNum+1);
      post("/api/increaseTrackNum",{gameCode:gameCode});
    }
    console.log("ending timer");
    if(roundOngoing){
      myAudio.play();
    }
  };

  const handleRoundStart = () => {
    setRoundOngoing(true);
    post("/api/roundStart",{gameCode: gameCode}).then(() => {
      myAudio.play();
    });
  };
  const handleRoundStartedByUser = (data) => {
    setRoundOngoing(true);
    myAudio.play();
  }

  const handleOnSubmit = (value) => {
    let success = value.toLowerCase() === trackList[trackNum].name.toLowerCase();
    post("/api/submitted",{gameCode: gameCode, user: userBuzz._id, sub: success, curr: trackNum});
  }

  const handleSubmit = async (data) => {
    await handleTimerEnd(data.submission);
    if(data.submission){
      setRoundOngoing(false);
    }
    setResetTimer(true);
  }

  useEffect(() => {
    if (trackNum && trackList && (!playingNum || playingNum != trackNum)) {
      setPlayingNum(trackNum);
      if (myAudio) {
        myAudio.pause();
      }
      setMyAudio(new Audio(trackList[trackNum].preview_url));
      console.log("set audio");
    }
  }, [trackNum, trackList, playingNum]);

  useEffect(()=> {
    if(myAudio){
      myAudio.addEventListener('ended', (event) => {
        setTrackNum(trackNum+1);
        post("/api/increaseTrackNum",{gameCode:gameCode});
        setRoundOngoing(false);
      });
    }
  },[myAudio]);

  let songInfo = roundOngoing ? userBuzz ? (<div>{userBuzz.name} has buzzed!</div>):(<div>Song #{trackNum} is playing</div>):(<div>There is currently no song playing</div>);
  let textBox =
    userBuzz && (userBuzz._id === props.userId) ? (
      <div>
        <InputAnswer submit={(sub) => handleOnSubmit(sub)} />
      </div>
    ) : (
      <></>
    );

  let buzzerState = canBuzz ? "u-pointer inGame-buzzerEffect" : "inGame-buzzer-locked";
  let countdownTimer = (<Countdown time={buzzTime} userExists={userBuzz ? true : false} end={() => handleTimerEnd()} forceReset={resetTimer} visible = "false"/>);
  let countdownState = userBuzz ? "" : "u-hidden";
  let buzzTextState = userBuzz ? "u-hidden" : "";

  return (
    <div className="inGame-container">
      <div className="inGame-container-left">
        <Scoreboard data={userData}/>
        <div className="inGame-add-music">Add music</div>
      </div>
      <div className="inGame-container-main">
        {/**I CHANGED THIS!!!!!!! Originally was "Wiwa's Game" */}
        <div className="inGame-header"><div className="inGame-title"><Name/>'s Game</div><div>Room Code: {gameCode}</div></div>
        <div className="song-info">{songInfo}</div>
        <div
          className={"game-buzzer u-noSelect "+buzzerState}
          onClick={() => handleBuzz()}
        >
          <div className="inGame-buzzer-text-container">
            <div className={buzzTextState+" inGame-buzzer-text"}>
              buzz
            </div>
            <div className={countdownState+" inGame-buzzer-text"}>
              {countdownTimer}
            </div>
          </div>
        </div>
        {textBox}
      </div>
      <br>
      </br>
      <div className={roundOngoing?"button-invisible":"u-pointer inGame-next-button"} onClick={() => handleRoundStart()}><div>Proceed to Next Round</div></div>
      <GameChat userId={props.userId} messages = {gameChat} gameCode = {props.gameCode} name = {props.name}/>
    </div>
  );
};
//TODOOOOO
export default InGame;