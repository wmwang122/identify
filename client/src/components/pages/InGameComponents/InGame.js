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

const InGame = (props) => {
  const [userData, setUserData] = useState([
  ]);
  const [userBuzz, setUserBuzz] = useState(null);
  const [userWhoBuzzed, setUserWhoBuzzed] = useState(null); //unnecesssary, just returns name instead of id
  const [trackList, setTrackList] = useState(null);
  const [trackNum, setTrackNum] = useState(1);
  const [myAudio, setMyAudio] = useState(null);
  const [playingNum, setPlayingNum] = useState(null);
  const [resetTimer, setResetTimer] = useState(false);
  const [roundOngoing, setRoundOngoing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [canBuzz, setCanBuzz] = useState(false);

    let answerVer = (<div>Placeholder</div>);
    let val = window.location.href;
    let gameCode = (val.substring(val.length - 5, val.length));

  const handleBuzz = (event) => {
    if(roundOngoing && !userBuzz){
        post("/api/buzz", { userId: props.userId, gameCode: gameCode, }); 
        myAudio.pause();
      }

  }
    
  useEffect(() => {
    if(!trackList){
      get("/api/testPlaylists").then((body) => {
        setTrackList(body.tracks.items);
        setTrackNum(1);
      });
    }
    socket.on("buzz", newBuzz);
    return () => {
      socket.off("buzz");
    };
  }, []);
    
  useEffect(() => {
      socket.on("new player", addData);
    return () => {
      socket.off("new player");
    };
  }, []);

  useEffect(() => {
    socket.on("submitted", handleSubmit);
  return () => {
    socket.off("submitted");
  };
}, []);

useEffect(() => {
  socket.on("starting", handleRoundStartedByUser);
  return () => {
    socket.off("starting");
  };
}, []);

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
        userData.push({ _id: userId, score: 0 });
        console.log(JSON.stringify(userData));
  }
    

  const newBuzz = (userId) => {
      setUserBuzz(userId);
      console.log("get paused");
      setIsPaused(true);
    let i = 0;
    let flag = false;
    for(i = 0; i < userData.length; i++){
      if(userData[i]._id === userId){
        flag = true;
        if(userData[i].name){
          setUserWhoBuzzed(userData[i].name);
          return;
        }
        break;
      }
    }
    get("/api/userLookup", { _id: userId }).then((user) => {
      setUserWhoBuzzed(user.name);
      if(flag){
        userData[i].name = user.name;
      }
      else{
        userData.push({
          _id: userId,
          name: user.name,
          score: 0,
        });
      }
    });
  };

  const handleTimerEnd = (success, curr) => {
    setUserWhoBuzzed(null);
    setUserBuzz(null);
    if(typeof success !== undefined){
      setIsPaused(success);
    }
    else{
      setIsPaused(true);
    }
    if(success){
      setTrackNum(curr+1);
    }
    if(success && myAudio){
      setIsPaused(true);
      myAudio.pause();
    }
    console.log("ending timer");
    if(roundOngoing){
      setIsPaused(false);
      myAudio.play();
    }
  };

  const handleRoundStart = () => {
    setRoundOngoing(true);
    post("/api/roundStart",{gameCode: gameCode}).then(() => {
      setIsPaused(false);
      myAudio.play();
    });
  };
  const handleRoundStartedByUser = (data) => {
    setRoundOngoing(true);
    setIsPaused(false);
    myAudio.play();
  }

  const handleOnSubmit = (value) => {
    let success = value.toLowerCase() === trackList[trackNum].name.toLowerCase();
    post("/api/submitted",{gameCode: gameCode, user: userBuzz, sub: success, curr: trackNum});
  }

  /*const handleSubmit = (value) => {
    console.log("answer: " + trackList[trackNum].name);
    console.log(value + " or " + trackList[trackNum].name);
    let success = value.toLowerCase() === trackList[trackNum].name.toLowerCase();
    post("/api/submitted",{gameCode: gameCode, user: userBuzz, correct: success});
    if(success){
      console.log(value + " was correct!");
      answerVer = (<div>{value} was correct!</div>);
      for(let i = 0; i < userData.length; i++){
        if(userData[i]._id === props.userId){
          //userData[i].score++;
          break;
        }
      }
      setRoundOngoing(false);
    }
    else{
      console.log(value + " was wrong!");
      answerVer = (<div>{value} was wrong!</div>);
    }
    setResetTimer(true);
    handleTimerEnd(success);
  };*/

  const handleSubmit = (data) => {
    if(data.submission){
      for(let i = 0; i < userData.length; i++){
        if(data.user === userData[i]._id){
          userData[i].score++;
          break;
        }
      }
      setRoundOngoing(false);
    }
    setResetTimer(true);
    handleTimerEnd(data.submission, data.curr);
  }

  useEffect(() => {
    if (trackNum && trackList && (!playingNum || playingNum != trackNum)) {
      setPlayingNum(trackNum);
      if (myAudio) {
        setIsPaused(true);
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
        setRoundOngoing(false);
      });
    }
  },[myAudio]);

  useEffect(()=>{
    if(myAudio){
      if(isPaused){
        myAudio.pause();
      }
      else{
        myAudio.play();
      }
    }
  },[isPaused]);
  let songInfo = roundOngoing ? userBuzz ? (<div>{userWhoBuzzed} has buzzed!</div>):(<div>Song #{trackNum} is playing</div>):(<div>There is currently no song playing</div>);
  let textBox =
    userBuzz === props.userId ? (
      <div>
        <InputAnswer submit={(sub) => handleOnSubmit(sub)} />
      </div>
    ) : (
      <></>
    );
  let buzzerState = canBuzz ? "u-pointer inGame-buzzerEffect" : "inGame-buzzer-locked";
  let countdownTimer = (<Countdown time={5} userExists={userBuzz ? true : false} end={() => handleTimerEnd()} forceReset={resetTimer} visible = "false"/>);
  let countdownState = userBuzz ? "" : "u-hidden";
  let buzzTextState = userBuzz ? "u-hidden" : "";

  return (
    <div className="inGame-container">
      <div className="inGame-container-left">
        <Scoreboard data={userData}/>
        <div>Add music</div>
      </div>
      <div className="inGame-container-main">
        <div className="inGame-header"><div className="inGame-title">Wiwa's Room</div><div>Room Code: {gameCode}</div></div>
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
      {answerVer}
      <button className={roundOngoing?"button-invisible":""} onClick={() => handleRoundStart()}>Proceed to Next Round</button>
    </div>
  );
};
//TODOOOOO
export default InGame;
