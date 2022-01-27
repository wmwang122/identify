import React, { Component, useEffect, useState } from "react";
import { navigate } from "@reach/router";
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
import SongInfo from "./SongInfo.js";
import GameEndScreen from "./GameEndScreen.js";
import SaveButton from "./SaveButton.js";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import useUnload from "./useUnload.js";

const InGame = (props) => {
  const [userData, setUserData] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [userBuzz, setUserBuzz] = useState(null);
  const [trackList, setTrackList] = useState(null);
  const [playlistIDs, setPlaylistIDs] = useState([]);
  const [trackNum, setTrackNum] = useState(0);
  const [myAudio, setMyAudio] = useStateWithCallbackLazy(null);
  const [resetTimer, setResetTimer] = useState(false);
  const [roundOngoing, setRoundOngoing] = useState(null);
  const [canBuzz, setCanBuzz] = useState(false);
  const [gameChat, setGameChat] = useState([]);
  const [gameLog, setGameLog] = useState([]);
  const [buzzTime, setBuzzTime] = useState(5);
  const [songTimeLeft, setSongTimeLeft] = useState(30);
  const [buzzTimeLeft, setBuzzTimeLeft] = useState(null);
  const [buzzStartingTime, setBuzzStartingTime] = useState(null);
  const [audioMounted, setAudioMounted] = useState(false);
  const [hostName, setHostName] = useState(null);
  const [endingMessage, setEndingMessage] = useState("");
  const [savedSongs, setSavedSongs] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [startingTime, setStartingTime] = useState(null);
  const [startingTimeLoaded, setStartingTimeLoaded] = useState(false);
  const [roundOngoingLoaded, setRoundOngoingLoaded] = useState(null);
  const [buzzStartingTimeLoaded, setBuzzStartingTimeLoaded] = useState(false);
  const [userBuzzLoaded, setUserBuzzLoaded] = useState(false);
  const [trackListLoaded, setTrackListLoaded] = useState(false);

  let val = window.location.href;
  let gameCode = props.gameCode;
  var getUserDataInterval = undefined;
  //let saveMessage = "save song for later";
  useEffect(()=>{
      getUserDataInterval = setInterval(function(){
        get("/api/getGameData", {code: gameCode}).then((data)=>{
          if((!data || !data.userData || data.userData.length===0)){
            clearInterval(getUserDataInterval);
            navigate("/lobby");
          }
          setUserData(data.userData);
        });
      },2000);
  },[]);
  const handleBuzz = async (event) => {
    setCanBuzz(false);
    if (roundOngoing && !userBuzz && canBuzz) {
      for (let i = 0; i < userData.length; i++) {
        if (userData[i]._id === props.userId) {
          userData[i].buzzed = true;
          post("/api/userBuzzSet", {gameCode: gameCode, index: i, val: true});
        }
      }
      post("/api/buzz", {
        userId: props.userId,
        gameCode: gameCode,
        name: props.name,
        roundNum: trackNum + 1,
      });
      if(myAudio){
        myAudio.pause();
      }
    }
  };

  const shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex = 0;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  const initialize = async () => {
    get("/api/getGameData", { code: gameCode }).then((data) => {
      setUserData(data.userData);
      setUserBuzz(data.userBuzz);
      setGameChat(data.gameChat);
      setTrackNum(data.trackNum);
      setBuzzTime(data.settings && data.settings.time ? data.settings.time : 5);
      setGameLog(data.gameLog);
      setHostName(data.hostName);
      setPlaylistIDs(data.playlistIDs);
      setSongTimeLeft(data.songTimeLeft);
      setBuzzTimeLeft(data.buzzTimeLeft);
      setTrackList(data.trackList);
      setEndingMessage(data.endingMessage);
      setRoundOngoing(data.roundOngoing);
      setStartingTime(data.songTimeLeft);
      setBuzzStartingTime(data.buzzTimeLeft);
      gameCode = val.substring(val.length - 5, val.length);
      //post("/api/addUserBackToGame",{gameCode: gameCode, userId: props.userId});
    });
  };

  useEffect(() => {
    if (startingTime) {
      setStartingTimeLoaded(true);
    }
  }, [startingTime]);

  useEffect(()=> {
    if(buzzStartingTime !== null){
      setBuzzStartingTimeLoaded(true);
    }
  }, [buzzStartingTime]);

  useEffect(()=>{
    if(!audioMounted){
      setCanBuzz(false);
    }
  },[audioMounted]);

  useEffect(()=> {
    let flag = false;
    if(userData){
      for(let i = 0; i < userData.length; i++){
        if(userData[i]._id === props.userId){
          if(userData[i].isHost){
            setIsHost(true);
          }
          flag = true;
          break;
        }
      }
      if(!flag){
        navigate("/lobby");
      }
    }
  },[userData]);
  useEffect(() => {
    if (roundOngoing !== null) {
      setRoundOngoingLoaded(true);
    }
  }, [roundOngoing]);

  useEffect(() =>{
    if (userBuzz !== null) {
      setUserBuzzLoaded(true);
    }
  }, [userBuzz]);

  useEffect(() => {
    if (trackList && trackList.length > 0) {
      setTrackListLoaded(true);
    }
  }, [trackList]);

  useEffect(() => {
    if(userData){
      for (let i = 0; i < userData.length; i++) {
        if (!userData[i].name) {
          get("/api/userLookup", { _id: userData[i]._id }).then((user) => {
            userData[i].name = user.name;
          });
        }
      }
    }
  }, [userData]);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(()=>{
    return () => {
      if(myAudio){
        myAudio.pause();
        clearInterval(getUserDataInterval);
      }
    }
  },[myAudio]);

  const sortUserData = () => {
    setUserData(
      userData.sort((userA, userB) => {
        return userB.score - userA.score;
      })
    );
  };

  /*useEffect(() => {
    let createTrackList = [];

    for (let i = 0; i < playlistIDs.length; i++) {
      get("/api/testPlaylists", { playlistID: playlistIDs[i] }).then((body) => {
        createTrackList = createTrackList.concat(body);
        setTrackList(createTrackList);
        if (i === playlistIDs.length - 1) {
          setTrackList(shuffle(createTrackList));
        }
      });
    }

    // console.log(createTrackList);

    // if (trackList) {
    //   get("/api/testPlaylists", {playlistIDs}).then((body) => {
    //     setTrackList(body);

    // //    post("/api/testPlaylistsInitialize",{data: body, gameCode: gameCode});
    //   });
    // }
  }, [playlistIDs]);*/ //this useEffect should be deleted ASAP after playlists are added

  /*useEffect(() => {
    if (!trackList || trackList.length === 0) {
      get("/api/getPopularSongs", {}).then((body) => {
        setTrackList(body);
      });
    }
  }, []);*/ //this is user-side, so everyone gets a different song! fix!!

  useEffect(() => {
    socket.on("new message", (message) => {
      console.log(`heard message: ${message}`)
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
    socket.on("added song", addSong);
    return () => {
      socket.off("added song");
    };
  });

  useEffect(() => {
    socket.on("game end", handleSocketEndGame);
    return () => {
      socket.off("game end");
    };
  });

  useEffect(() => {
    socket.on("timer end", async () =>{
      console.log("this message has been received");
      await setRoundOngoing(false);
      console.log("round ongoing has now been set to: " + roundOngoing);
      await initialize();
    });
    return () => {
      socket.off("timer end");
    }
  });

  useEffect(() => {
    if (!roundOngoing && userData) {
      for (let i = 0; i < userData.length; i++) {
        userData[i].buzzed = false;
        post("/api/userBuzzSet", {gameCode: gameCode, index: i, val: false});
      }
    }
  }, [roundOngoing]);

  const handleSocketEndGame = (data) => {
    let user = undefined;
    for (let i = 0; i < userData.length; i++) {
      if (props.userId === userData[i]._id) {
        user = userData[i];
        break;
      }
    }
    if (user) {
      post("/api/updateUserStats", { user: user, savedSongs: savedSongs, trackList: trackList });
    }
    setGameEnded(true);
  };

  useEffect(() => {
    if(trackList){
      if(props.userId === "61f10235fd1767a3c490756d"){
        console.log("THE ANSWER IS: " + trackList[trackNum].name);
      }
    }
    post("/api/updateSongTimeLeft", { gameCode: gameCode, songTimeLeft: songTimeLeft });
  }, [songTimeLeft]);
  useEffect(() => {
    post("/api/updateBuzzTimeLeft", { gameCode: gameCode, buzzTimeLeft: buzzTimeLeft });
  }, [buzzTimeLeft]);

  useEffect(() => {
    let alreadyBuzzed = true;
    if(userData){
      for (let i = 0; i < userData.length; i++) {
        if (userData[i]._id === props.userId) {
          alreadyBuzzed = userData[i].buzzed;
          break;
        }
      }
    }
    if (userBuzz) {
      setCanBuzz(false);
    } else if (roundOngoing && !alreadyBuzzed) {
      setCanBuzz(true);
    } else {
      setCanBuzz(false);
    }
  }, [roundOngoing, userBuzz, userData]);

  const addData = (userId) => {
    setUserData([...userData, { _id: userId, score: 0 }]);
  };

  const newBuzz = (userId) => {
    let found = false;
    for (let i = 0; i < userData.length; i++) {
      if (userData[i]._id === userId) {
        found = true;
        setUserBuzz(userData[i]);
        userData[i].buzzed = true;
        post("/api/userBuzzSet", {gameCode: gameCode, index: i, val: true});
        break;
      }
    }
    if (!found) {
      console.log("error");
    }
    if(myAudio){
      myAudio.pause();
    }
  };

  const handleTimerEnd = async (data) => {
    setUserBuzz(false);
    setBuzzStartingTime(buzzTime);
    for (let i = 0; i < userData.length; i++) {
      if (userData[i]._id === userBuzz._id) {
        userData[i].buzzed = true;
        await post("/api/userBuzzSet", {gameCode: gameCode, index: i, val: true});
        userData[i].score += data?data.success ? (data.early ? 15 : 10) : -5:0;
        break;
      }
    }
    await post("/api/clearBuzz", { gameCode: gameCode });
    if (data && typeof data.success !== undefined && myAudio) {
      data.success ? myAudio.pause() : myAudio.play();
    } else if (myAudio) {
      myAudio.pause();
    }
    if (data && data.success && trackNum + 1) {
      setTrackNum(trackNum + 1);
      await post("/api/increaseTrackNum", { gameCode: gameCode });
    }
    if (roundOngoing && myAudio) {
      myAudio.play();
    }
    if ((!data || !data.success) && trackNum + 1) {
      if (userData.length > 0) {
        let stillExistsUser = false;
        for (let i = 0; i < userData.length; i++) {
          if (!userData[i].buzzed) {
            stillExistsUser = true;
            break;
          }
        }
        if (!stillExistsUser) {
          if(myAudio){
            myAudio.pause();
          }
          await post("/api/everyoneBuzzed", {
            gameCode: gameCode,
            song: trackList[trackNum],
            roundNum: trackNum + 1,
          });
          let message = "Everyone has guessed wrong! The song was: ";
          setEndingMessage(message);
          post("/api/setEndingMessage", { message: message, gameCode: gameCode });
          setTrackNum(trackNum + 1);
          setRoundOngoing(false);
          setStartingTime(30);
        }
      }
    }
    await post("/api/timerEnded", {gameCode: gameCode});
    console.log("ending timer");
  };

  const handleAddSong = (newSong) => {
    post("/api/addSong", { song: newSong, gameCode: gameCode });
  };

  const addSong = (newSong) => {
    setTrackList([...trackList, newSong]);
  };

  const handleRoundStart = () => {
    post("/api/roundStart", { gameCode: gameCode });
  };
  const handleRoundStartedByUser = (data) => {
    if (trackList && trackNum < trackList.length) {
      setRoundOngoing(true);
      if(myAudio){
        myAudio.play();
      }
      console.log("audio started playing: " + JSON.stringify(myAudio));
    } else {
      handleGameEnd();
    }
  };

  const handleOnSubmit = (value) => {
        let trackName = trackList[trackNum].name.toLowerCase();
        console.log(trackName);

        if (trackName.indexOf("(") !== -1) {
          let index = trackName.indexOf("(");
          trackName = trackName.slice(0, index).trim();

        }

        if (trackName.indexOf("-") !== -1) {
          let index = trackName.indexOf("-");
          trackName = trackName.slice(0, index).trim();
        }

        let userAnswer = value.toLowerCase();
        let length = trackName.length;
        userAnswer = userAnswer.slice(0, length);

        let success = userAnswer === trackName;
    
   // let success = value.toLowerCase() === trackList[trackNum].name.toLowerCase();
    let early = (songTimeLeft > 15);
    //trackList[trackNum].track.name.toLowerCase(); //ALSO PLS DONT RB
    post("/api/submitted", {
      gameCode: gameCode,
      user: userBuzz,
      sub: success,
      curr: trackNum,
      value: value,
      roundNum: trackNum + 1,
      early: early,
    });
  };

  //initialize + new game
  const handleSubmit = async (data) => {
    await handleTimerEnd({ success: data.submission, early: data.early });
    if (data.submission) {
      sortUserData();
      setRoundOngoing(false);
      let message = data.name + " got the correct answer: ";
      setEndingMessage(message);
      setStartingTime(30);
      post("/api/setEndingMessage", { message: message, gameCode: gameCode });
    }
    setResetTimer(true);
  };

  const handleSaveSong = () => {
    setSavedSongs([...savedSongs, trackNum - 1]);
  };

  const handleGameEnd = () => {
    console.log("game has ended");
    setGameEnded(true);
    post("/api/gameEnding", { gameCode: gameCode });
  };

  useEffect(() => {
    if (roundOngoingLoaded && !roundOngoing) {
      if (myAudio) {
        myAudio.pause();
      }
      if (trackList) {
        while (trackNum < trackList.length && !trackList[trackNum].preview_url) {
          trackList.splice(trackNum, 1);
        }
        if (trackNum >= trackList.length) {
          console.log("no more songs");
        } else {
          setMyAudio(new Audio(trackList[trackNum].preview_url));
          setAudioMounted(true);
          console.log("audio set");
        }
      }
    } 
  }, [trackNum, trackList, roundOngoing, userBuzz, roundOngoingLoaded]);

  useEffect(()=>{
    if(trackList){
      for(let i = 0; i < trackList.length; i++){
        if(!trackList[i].preview_url){
          trackList.splice(i,1);
          i--;
        }
      }
    }
  },[trackList]);

  useEffect(() => {
    if (myAudio) {
      myAudio.addEventListener("ended", (event) => {
        handleSongEnd();
      });
    }
  }, [myAudio]);

  const handleSongEnd = () => {
    post("/api/songEnded", {
      gameCode: gameCode,
      song: trackList[trackNum],
      roundNum: trackNum + 1,
    });
    let message = "The timer has ended! The song was: ";
    setEndingMessage(message);
    post("/api/setEndingMessage", { message: message, gameCode: gameCode });
    setTrackNum(trackNum + 1);
    setRoundOngoing(false);
    setStartingTime(30);
  };

  let songInfo = audioMounted ? (roundOngoing ? (
    userBuzz ? (
      <div className="game-info-text">{userBuzz.name} has buzzed!</div>
    ) : (
      <div className="game-info-text">Song #{(trackNum + 1)+(trackList?"/"+trackList.length:"")} is playing</div>
    )
  ) : (
    <div className="game-info-text">There is currently no song playing.</div>
  )):(<div className="game-info-text">Audio not loaded. Please wait for the next round!</div>);
  let textBox =
    userBuzz && userBuzz._id === props.userId ? (
      <div >
        <InputAnswer submit={(sub) => handleOnSubmit(sub)} />
      </div>
    ) : (
      <></>
    );

  let buzzerState = canBuzz ? "u-pointer inGame-buzzerEffect" : "inGame-buzzer-locked";
  let countdownTimer = (
    userBuzzLoaded && buzzStartingTimeLoaded ? (
    <Countdown
      time={buzzStartingTime}
      activate={userBuzz ? true : false}
      end={() => handleTimerEnd()}
      forceReset={resetTimer}
      visible="false"
      updateTimeLeft={(data) => setBuzzTimeLeft(data)}
    />):
    (<></>)
  );
  let gameTimer =
    roundOngoingLoaded && startingTimeLoaded ? (
      <Countdown
        time={startingTime}
        activate={roundOngoing ? true : false}
        paused={userBuzz ? true : false}
        end={() => handleSongEnd()}
        visible="false"
        isGameTimer={true}
        gameCode={gameCode}
        updateTimeLeft={(data) => setSongTimeLeft(data)}
      />
    ) : (
      <></>
    );
  //time={30} should be changed at some point to account for reloading
  let gameTimeButton = roundOngoing ? (
    <div className="inGame-time-left">
      <div className="inGame-time-left-text">Time left: </div>
      {gameTimer}
    </div>
  ) : (
    <>
    <div className={"u-pointer inGame-next-button"} onClick={() => handleRoundStart()}>
      {!trackList || trackNum === trackList.length
        ? "End Game"
        : trackNum == 0
        ? "Start Round"
        : "Proceed to Next Round"}
    </div>
    <div className={"u-pointer inGame-next-button-small"} onClick={() => handleRoundStart()}>
      {!trackList || trackNum === trackList.length
        ? "End"
        : trackNum == 0
        ? "Start"
        : "Next"}
    </div>
    </>
  );



    
 





  


  let countdownState = userBuzz ? "" : "u-hidden";
  let buzzTextState = userBuzz ? "u-hidden" : "";
  let gameMainComponent =
    roundOngoing || trackNum === 0 || !trackList || trackList.length === 0 ? (
      <div className="upper-padding">
        <div className="song-info">{songInfo}</div>
        <div className={"game-buzzer u-noSelect " + buzzerState} onClick={() => handleBuzz()}>
          <div className="inGame-buzzer-text-container">
            <div className={buzzTextState + " inGame-buzzer-text"}>buzz</div>
            <div className={countdownState + " inGame-buzzer-text"}>{countdownTimer}</div>
          </div>
        </div>
      </div>
    ) : (
      <div className="upper-padding">
        <div>
          <div className="song-info-end">
            <div className="song-ending-message">
              {endingMessage}
              <span className="song-name-end">{trackList[trackNum - 1].name}</span>
            </div>
          </div>
          <SongInfo song={trackList[trackNum - 1]} />
        </div>
        <div className="save-button">
          <SaveButton handle={() => handleSaveSong()} />{" "}
        </div>
      </div>
    );

  return (
    <>
      <div className="inGame-container">
        <div className="inGame-container-left">
          <Scoreboard data={userData} />
          <SelectSong handleAddSong={(song) => handleAddSong(song)} active = {isHost}/>
        </div>
        <div className="inGame-vertical-line" />
        <div className="inGame-container-main">
          <div className="inGame-header">
            <div className="inGame-title">{hostName}'s Game</div>
            <div>Room Code: {gameCode}</div>
          </div>
          {gameMainComponent}
          {textBox}
        </div>
        <br></br>
        <div className="inGame-container-right">
          {gameTimeButton}
          <div className="inGame-gameLog-container">
            <GameLog messages={gameLog} />
          </div>
        </div>
        <div className = "inGame-gameChat-container">
          <GameChat
            userId={props.userId}
            messages={gameChat}
            gameCode={props.gameCode}
            name={props.name}
          />
        </div>
      </div>
      {gameEnded ? (
        <GameEndScreen
          leaderboard={userData?userData.slice(0, Math.min(3, userData.length)):[]}
          savedSongs={savedSongs}
          trackList={trackList}
        />
      ) : (
        <div />
      )}
    </>
  );
};
export default InGame;
