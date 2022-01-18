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
    socket.on("submitted", handleUserSubmission);
  return () => {
    socket.off("submitted");
  };
}, []);

    const addData = (userId) => {
        userData.push({ _id: userId, score: 0 });
        console.log(JSON.stringify(userData));
  }
    

  const newBuzz = (userId) => {
      setUserBuzz(userId);
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

  const handleTimerEnd = () => {
    setUserWhoBuzzed(null);
    setUserBuzz(null);
    console.log(trackNum);
    console.log("ending timer");
    if(roundOngoing){
      myAudio.play();
    }
  };

  const handleRoundStart = () => {
    setRoundOngoing(true);
    myAudio.play();
  };

  const handleSubmit = (value) => {
    console.log("answer: " + trackList[trackNum].name);
    console.log(value + " or " + trackList[trackNum].name);
    post("/api/submitted",{gameCode: gameCode, user: userBuzz, correct: (value.toLowerCase() === trackList[trackNum].name.toLowerCase())});
    if(value.toLowerCase() === trackList[trackNum].name.toLowerCase()){
      setTrackNum(trackNum + 1);
      console.log(value + " was correct!");
      answerVer = (<div>{value} was correct!</div>);
      for(let i = 0; i < userData.length; i++){
        if(userData[i]._id === props.userId){
          userData[i].score++;
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
    handleTimerEnd();
  };

  const handleUserSubmission = (data) => {
    if(data.correct){
      for(let i = 0; i < userData.length; i++){
        if(data.user === userData[i]._id){
          userData[i].score++;
          break;
        }
      }
      setRoundOngoing(false);
    }
    setResetTimer(true);
    handleTimerEnd();
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
        setRoundOngoing(false);
      });
    }
  },[myAudio])

  var whoBuzzed = userBuzz ? <div>{userWhoBuzzed} has buzzed!</div> : <div>No one has buzzed!</div>;
  var textBox =
    userBuzz === props.userId ? (
      <div>
        <InputAnswer submit={(sub) => handleSubmit(sub)} />
      </div>
    ) : (
      <></>
    );
  const countdownTimer = (<Countdown time={5} userExists={userBuzz ? true : false} end={() => handleTimerEnd()} forceReset={resetTimer} visible = "button-invisible"/>);

  return (
    <div className="inGame-container">
      <div className="inGame-container-left">
        <Scoreboard data={userData}/>
        <div>Add music</div>
      </div>
      <div className="inGame-container-right">
        <div>Room name</div>
        <div
          className="game-buzzer u-background-brightgreen u-pointer u-noSelect"
          onClick={() => handleBuzz()}
        >
          buzz
        </div>
        {whoBuzzed}
        {textBox}
      </div>
      {countdownTimer}
      {answerVer}
      <button className={roundOngoing?"button-invisible":""} onClick={() => handleRoundStart()}>Proceed to Next Round</button>
    </div>
  );
};
//TODOOOOO
export default InGame;
