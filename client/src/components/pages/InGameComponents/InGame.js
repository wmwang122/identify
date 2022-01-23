import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import "./InGame.css";
import Scoreboard from "./Scoreboard.js";
import Countdown from "./Countdown.js";
import { get, post } from "../../../utilities.js";
import { socket } from "../../../client-socket.js";
import InputAnswer from "./InputAnswer.js";
import GameChat from "./GameChat.js";
import GameLog from "./GameLog.js";
import SelectSong from "./SelectSong.js";

const InGame = (props) => {
  const [userData, setUserData] = useState([]);
  const [userBuzz, setUserBuzz] = useState(null);
  const [trackList, setTrackList] = useState(null);
  const [trackNum, setTrackNum] = useState(1);
  const [myAudio, setMyAudio] = useState(null);
  const [playingNum, setPlayingNum] = useState(null);
  const [resetTimer, setResetTimer] = useState(false);
  const [roundOngoing, setRoundOngoing] = useState(false);
  const [canBuzz, setCanBuzz] = useState(false);
  const [gameChat, setGameChat] = useState([]);
  const [gameLog, setGameLog] = useState([]);
  const [buzzTime, setBuzzTime] = useState(5);
  const [songTimeLeft, setSongTimeLeft] = useState(30);
  const [audioMounted, setAudioMounted] = useState(false);
  const [hostName, setHostName] = useState(null);

  let val = window.location.href;
  let gameCode = val.substring(val.length - 5, val.length);

  const handleBuzz = async (event) => {
    if (roundOngoing && !userBuzz) {
      post("/api/buzz", {
        userId: props.userId,
        gameCode: gameCode,
        name: props.name,
        roundNum: trackNum,
      });
      myAudio.pause();
    }
  };

  const initialize = () => {
    get("/api/getGameData", { code: gameCode }).then((data) => {
      console.log(JSON.stringify(data));
      setUserData(data.userData);
      setUserBuzz(data.userBuzz);
      setGameChat(data.gameChat);
      setTrackNum(data.trackNum);
      setBuzzTime(data.settings.time ? data.settings.time : 5);
      setGameLog(data.gameLog);
      setRoundOngoing(data.roundOngoing);
      setHostName(data.hostName);
      //setTrackList(data.trackList); add this once we support adding playlists
      setSongTimeLeft(data.songTimeLeft);
    });
  };

  useEffect(() => {
    console.log(songTimeLeft);
  });
  useEffect(() => {
    for (let i = 0; i < userData.length; i++) {
      if (!userData[i].name) {
        get("/api/userLookup", { _id: userData[i]._id }).then((user) => {
          userData[i].name = user.name;
        });
      }
    }
  }, [userData]);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!trackList) {
      get("/api/testPlaylists").then((body) => {
        setTrackList(body.tracks.items);
      });
    }
  }, []); //this useEffect should be deleted ASAP after playlists are added

  useEffect(() => {
    socket.on("new message", (message) => {
      setGameChat([...gameChat, message]);
    });
    return () => {
      socket.off("new message");
    };
  });

  useEffect(() => {
    socket.on("new log", (message) => {
      setGameLog([...gameLog, message]);
      console.log("changed gameLog");
    });
    return () => {
      socket.off("new log");
    };
  });

  useEffect(() => {
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

  useEffect(() => {
    if (userBuzz) {
      setCanBuzz(false);
    } else if (roundOngoing) {
      setCanBuzz(true);
    } else {
      setCanBuzz(false);
    }
  }, [roundOngoing, userBuzz]);

  const addData = (userId) => {
    setUserData([...userData, { _id: userId, score: 0 }]);
  };

  const newBuzz = (userId) => {
    let found = false;
    for (let i = 0; i < userData.length; i++) {
      if (userData[i]._id === userId) {
        found = true;
        setUserBuzz(userData[i]);
        console.log("user2: " + JSON.stringify(userData[i]));
        break;
      }
    }
    if (!found) {
      console.log("error");
    }
    myAudio.pause();
    setAudioMounted(false);
  };

  const handleTimerEnd = async (success) => {
    setUserBuzz(null);
    if (success) {
      for (let i = 0; i < userData.length; i++) {
        if (userData[i]._id === userBuzz._id) {
          userData[i].score++;
          break;
        }
      }
    }
    await post("/api/clearBuzz", { gameCode: gameCode });
    if (typeof success !== undefined && myAudio) {
      success ? myAudio.pause() : myAudio.play();
    } else if (myAudio) {
      myAudio.pause();
    }
    if (success && trackNum) {
      setTrackNum(trackNum + 1);
      post("/api/increaseTrackNum", { gameCode: gameCode });
    }
    console.log("ending timer");
    if (roundOngoing) {
      myAudio.play();
    }
  };

  const addSong = (newSong) => {
    setTrackList([... trackList, newSong]);
    post("/api/addSong", {song: newSong, gameCode: gameCode});
  }

  const handleRoundStart = () => {
    setRoundOngoing(true);
    post("/api/roundStart", { gameCode: gameCode }).then(() => {
      myAudio.play();
    });
  };
  const handleRoundStartedByUser = (data) => {
    setRoundOngoing(true);
    myAudio.play();
  };

  const handleOnSubmit = (value) => {
    let success = value.toLowerCase() === trackList[trackNum].track.name.toLowerCase();
    post("/api/submitted", {
      gameCode: gameCode,
      user: userBuzz._id,
      sub: success,
      curr: trackNum,
      value: value,
      roundNum: trackNum,
    });
  };

  const handleSubmit = async (data) => {
    await handleTimerEnd(data.submission);
    if (data.submission) {
      setRoundOngoing(false);
    }
    setResetTimer(true);
  };

  const handleGameEnd = () => {
    console.log("game has ended");
  }

  useEffect(() => {
      if(!roundOngoing){
        console.log("this useeffect is being called here");
        if (myAudio) {
          myAudio.pause();
        }
        if(trackList){
          while(trackNum < trackList.length && !trackList[trackNum].track.preview_url){
            trackList.splice(trackNum,1);
          }
          if(trackNum >= trackList.length){
            handleGameEnd();
          }
          else{
            setMyAudio(new Audio(trackList[trackNum].track.preview_url));
          }
        }
        if (trackList) {
          setMyAudio(new Audio(trackList[trackNum].preview_url));
        }
        setAudioMounted(true);
      } else if (!audioMounted && !userBuzz) {
      console.log("this useeffect is being called there");
      if (myAudio) {
        myAudio.currentTime = 30 - songTimeLeft;
      }
    }
  }, [trackNum, trackList, roundOngoing, userBuzz]);

  useEffect(() => {
    if (myAudio) {
      myAudio.addEventListener("ended", (event) => {
        handleSongEnd();
      });
    }
  }, [myAudio]);

  const handleSongEnd = () => {
    post("/api/songEnded", { gameCode: gameCode, song: trackList[trackNum], roundNum: trackNum });
    setTrackNum(trackNum + 1);
    setRoundOngoing(false);
  };

  let songInfo = roundOngoing ? (
    userBuzz ? (
      <div>{userBuzz.name} has buzzed!</div>
    ) : (
      <div>Song #{trackNum} is playing</div>
    )
  ) : (
    <div>There is currently no song playing</div>
  );
  let textBox =
    userBuzz && userBuzz._id === props.userId ? (
      <div>
        <InputAnswer submit={(sub) => handleOnSubmit(sub)} />
      </div>
    ) : (
      <></>
    );

  let buzzerState = canBuzz ? "u-pointer inGame-buzzerEffect" : "inGame-buzzer-locked";
  let countdownTimer = (
    <Countdown
      time={buzzTime}
      activate={userBuzz ? true : false}
      end={() => handleTimerEnd()}
      forceReset={resetTimer}
      visible="false"
    />
  );
  let gameTimer = (
    <Countdown
      time={30}
      activate={roundOngoing ? true : false}
      paused={userBuzz ? true : false}
      end={() => handleSongEnd()}
      visible="false"
      isGameTimer={true}
      gameCode={gameCode}
      updateSongTimeLeft={(data) => setSongTimeLeft(data)}
    />
  );
  //time={30} should be changed at some point to account for reloading
  let gameTimeButton = roundOngoing ? (
    <div className="inGame-time-left">
      <div className="inGame-time-left-text">Time left: </div>
      {gameTimer}
    </div>
  ) : (
    <div className={"u-pointer inGame-next-button"} onClick={() => handleRoundStart()}>
      Proceed to Next Round
    </div>
  );
  let countdownState = userBuzz ? "" : "u-hidden";
  let buzzTextState = userBuzz ? "u-hidden" : "";

  return (
    <div className="inGame-container">
      <div className="inGame-container-left">
        <Scoreboard data={userData}/>
        <SelectSong handleAddSong = {(song) => addSong(song)}/>
      </div>
      <div className="inGame-container-main">
        {/**I CHANGED THIS!!!!!!! Originally was "Wiwa's Game" */}
        <div className="inGame-header">
          <div className="inGame-title">{hostName}'s Game</div>
          <div>Room Code: {gameCode}</div>
        </div>
        <div className="song-info">{songInfo}</div>
        <div className={"game-buzzer u-noSelect " + buzzerState} onClick={() => handleBuzz()}>
          <div className="inGame-buzzer-text-container">
            <div className={buzzTextState + " inGame-buzzer-text"}>buzz</div>
            <div className={countdownState + " inGame-buzzer-text"}>{countdownTimer}</div>
          </div>
        </div>
        {textBox}
      </div>
      <br></br>
      <div className="inGame-container-right">
        {gameTimeButton}
        <GameLog messages={gameLog} />
      </div>
      <GameChat
        userId={props.userId}
        messages={gameChat}
        gameCode={props.gameCode}
        name={props.name}
      />{" "}
    </div>
  );
};
//TODOOOOO
export default InGame;
