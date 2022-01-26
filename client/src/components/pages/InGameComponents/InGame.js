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
import SongInfo from "./SongInfo.js";
import GameEndScreen from "./GameEndScreen.js";
import SaveButton from "./SaveButton.js";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import useUnload from "./useUnload.js";

const InGame = (props) => {
  const [userData, setUserData] = useState([]);
  const [userBuzz, setUserBuzz] = useState(null);
  const [trackList, setTrackList] = useState(null);
  const [playlistIDs, setPlaylistIDs] = useState([]);
  const [trackNum, setTrackNum] = useState(0);
  const [myAudio, setMyAudio] = useState(null);
  const [resetTimer, setResetTimer] = useState(false);
  const [roundOngoing, setRoundOngoing] = useState(null);
  const [canBuzz, setCanBuzz] = useState(false);
  const [gameChat, setGameChat] = useState([]);
  const [gameLog, setGameLog] = useState([]);
  const [buzzTime, setBuzzTime] = useState(5);
  const [songTimeLeft, setSongTimeLeft] = useState(30);
  const [audioMounted, setAudioMounted] = useState(false);
  const [hostName, setHostName] = useState(null);
  const [endingMessage, setEndingMessage] = useState("");
  const [savedSongs, setSavedSongs] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [startingTime, setStartingTime] = useState(null);
  const [startingTimeLoaded, setStartingTimeLoaded] = useState(false);
  const [roundOngoingLoaded, setRoundOngoingLoaded] = useState(false);
  const [trackListLoaded, setTrackListLoaded] = useState(false);
  const [closeGame, setCloseGame] = useState(0);

  let val = window.location.href;
  let gameCode = val.substring(val.length - 5, val.length);
  //let saveMessage = "save song for later";

  const handleBuzz = async (event) => {
    if (roundOngoing && !userBuzz && canBuzz) {
      for (let i = 0; i < userData.length; i++) {
        if (userData[i]._id === props.userId) {
          userData[i].buzzed = true;
          setCanBuzz(false);
        }
      }
      post("/api/buzz", {
        userId: props.userId,
        gameCode: gameCode,
        name: props.name,
        roundNum: trackNum + 1,
      });
      myAudio.pause();
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
      setBuzzTime(data.settings.time ? data.settings.time : 5);
      setGameLog(data.gameLog);
      setHostName(data.hostName);
      setPlaylistIDs(data.playlistIDs);
      setSongTimeLeft(data.songTimeLeft);
      setTrackList(data.trackList);
      setEndingMessage(data.endingMessage);
      setRoundOngoing(data.roundOngoing);
      setRoundOngoing(data.roundOngoing);
      setStartingTime(data.songTimeLeft);
      gameCode = val.substring(val.length - 5, val.length);
      //post("/api/addUserBackToGame",{gameCode: gameCode, userId: props.userId});
    });
  };

  useEffect(() => {
    if (startingTime) {
      setStartingTimeLoaded(true);
    }
  }, [startingTime]);
  useEffect(() => {
    if (roundOngoing) {
      setRoundOngoingLoaded(true);
    }
  }, [roundOngoing]);

  useEffect(() => {
    if (trackList && trackList.length > 0) {
      setTrackListLoaded(true);
    }
  }, [trackList]);

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
  setTimeout(()=>{
    console.log("loaded");
  },2000);
  if(trackList && roundOngoing && !audioMounted){
    console.log("hello! initialized!");
    myAudio = new Audio(trackList[trackNum].preview_url);
    myAudio.currentTime = 30 - songTimeLeft;
    myAudio.play();
    setAudioMounted(true);
  }

  useEffect(()=>{
    return () => {
      if(myAudio){
        myAudio.pause();
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
    if (!roundOngoing) {
      for (let i = 0; i < userData.length; i++) {
        userData[i].buzzed = false;
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
    post("/api/updateSongTimeLeft", { gameCode: gameCode, songTimeLeft: songTimeLeft });
  }, [songTimeLeft]);

  useEffect(() => {
    let alreadyBuzzed = true;
    for (let i = 0; i < userData.length; i++) {
      if (userData[i]._id === props.userId) {
        alreadyBuzzed = userData[i].buzzed;
        break;
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
        break;
      }
    }
    if (!found) {
      console.log("error");
    }
    myAudio.pause();
  };

  const handleTimerEnd = async (data) => {
    setUserBuzz(null);
    for (let i = 0; i < userData.length; i++) {
      if (userData[i]._id === userBuzz._id) {
        userData[i].score += data.success ? (data.early ? 15 : 10) : -5;
        break;
      }
    }
    await post("/api/clearBuzz", { gameCode: gameCode });
    if (typeof data.success !== undefined && myAudio) {
      data.success ? myAudio.pause() : myAudio.play();
    } else if (myAudio) {
      myAudio.pause();
    }
    if (data.success && trackNum + 1) {
      setTrackNum(trackNum + 1);
      post("/api/increaseTrackNum", { gameCode: gameCode });
    }
    if (roundOngoing) {
      myAudio.play();
    }
    if (!data.success && trackNum + 1) {
      if (userData.length > 0) {
        let stillExistsUser = false;
        console.log(userData);
        for (let i = 0; i < userData.length; i++) {
          if (!userData[i].buzzed) {
            stillExistsUser = true;
            break;
          }
        }
        if (!stillExistsUser) {
          myAudio.pause();
          post("/api/everyoneBuzzed", {
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
      myAudio.play();
      console.log("audio started playing: " + JSON.stringify(myAudio));
    } else {
      handleGameEnd();
    }
  };

  const handleOnSubmit = (value) => {
        console.log("inside answer checker");
        let trackName = trackList[trackNum].name.toLowerCase();
        console.log(trackName);

        if (trackName.indexOf("(") !== -1) {
          let index = trackName.indexOf("(");
          trackName = trackName.slice(0, index).trim();
          console.log("parenthesess found " + trackName);
          console.log(trackName.length);

        }

        if (trackName.indexOf("-") !== -1) {
          let index = trackName.indexOf("-");
          trackName = trackName.slice(0, index).trim();
          console.log("- found" + trackName);
          console.log(trackName.length);
        }

        let userAnswer = value.toLowerCase();
        let length = trackName.length;
        userAnswer = userAnswer.slice(0, length);
        console.log("spliced user answer: " + userAnswer);

        let success = userAnswer === trackName;
        console.log("successful? " + success);
    
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
    if (!roundOngoing) {
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
        }
      }
      setAudioMounted(true);
    } else if (!audioMounted && !userBuzz) {
      if (myAudio) {
        myAudio.currentTime = 30 - songTimeLeft;
        myAudio.play();
        setAudioMounted(true);
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

  let songInfo = roundOngoing ? (
    userBuzz ? (
      <div>{userBuzz.name} has buzzed!</div>
    ) : (
      <div>Song #{trackNum + 1} is playing</div>
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
        updateSongTimeLeft={(data) => setSongTimeLeft(data)}
      />
    ) : (
      <></>
    );
  let gameCloseTimer = (
    <Countdown
      time={1000}
      activate={true}
      resetOnUpdate={closeGame}
      end={() => handleGameEnd()}
      hide={true}
    />
  );

  useEffect(() => {
    console.log("oops!");
    setCloseGame(closeGame + 1);
  }, [roundOngoing]);
  //time={30} should be changed at some point to account for reloading
  let gameTimeButton = roundOngoing ? (
    <div className="inGame-time-left">
      <div className="inGame-time-left-text">Time left: </div>
      {gameTimer}
    </div>
  ) : (
    <div className={"u-pointer inGame-next-button"} onClick={() => handleRoundStart()}>
      {!trackList || trackNum === trackList.length
        ? "end game"
        : trackNum == 0
        ? "start round"
        : "proceed to next round"}
    </div>
  );
  let countdownState = userBuzz ? "" : "u-hidden";
  let buzzTextState = userBuzz ? "u-hidden" : "";
  let gameMainComponent =
    roundOngoing || trackNum === 0 || !trackList || trackList.length === 0 ? (
      <>
        <div className="song-info">{songInfo}</div>
        <div className={"game-buzzer u-noSelect " + buzzerState} onClick={() => handleBuzz()}>
          <div className="inGame-buzzer-text-container">
            <div className={buzzTextState + " inGame-buzzer-text"}>buzz</div>
            <div className={countdownState + " inGame-buzzer-text"}>{countdownTimer}</div>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="song-info-end">
          {endingMessage}
          <span className="song-name-end">{trackList[trackNum - 1].name}</span>
        </div>
        <SongInfo song={trackList[trackNum - 1]} />
        <SaveButton handle={() => handleSaveSong()} />
      </>
    );

  return (
    <>
      <div className="inGame-container">
        <div className="inGame-container-left">
          <Scoreboard data={userData} />
          <SelectSong handleAddSong={(song) => handleAddSong(song)} />
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
          <GameLog messages={gameLog} />
        </div>
        <GameChat
          userId={props.userId}
          messages={gameChat}
          gameCode={props.gameCode}
          name={props.name}
        />{" "}
      </div>
      {gameEnded ? (
        <GameEndScreen
          leaderboard={userData.slice(0, Math.min(3, userData.length))}
          savedSongs={savedSongs}
          trackList={trackList}
        />
      ) : (
        <div />
      )}
      {gameCloseTimer}
    </>
  );
};
export default InGame;
