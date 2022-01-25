import React, { useEffect, useState } from "react";
import "./Options.css";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";
import { get, post } from "../../../utilities.js";
import Playlists from "./Playlists.js";
import GenreSelect from "./GenreSelect.js";
import SelectSong1 from "./SelectSong1.js";
import MusicSelect from "./MusicSelect.js";

const Options = (props) => {
  const [displayPop, setDisplayPop] = useState(false);
  const [isPublic, setVisible] = useState(false);
  const [wantsOwnPlaylist, setWantsOwnPlaylist] = useState(false);
  const [numberQuestions, setQuestions] = useState(0);
  const [time, setTime] = useState(0);
  const [playlists, setPlaylists] = useState([]);
  const [selectedMusicType, setSelectedMusicType] = useState("");
  


  const handleAddSong = (newSong) => {
    <div> </div>;
  };

  let gameSettings = {
    isPublic: isPublic,
    wantsOwnPlaylist: wantsOwnPlaylist,
    numberQuestions: numberQuestions,
    time: time,
    playlistIDs: playlists,
  };



  let choosePlaylists = (selectedMusicType === "my playlists") ? (
    <div>
      <Playlists selectedPlaylists={playlists} />
    </div>
  ) : (
    <></>
  );

  let chooseGenre = (selectedMusicType === "genres") ? (
    <div>
      <GenreSelect />
    </div>) : (
    <></>
  );

  let chooseSearch = (selectedMusicType === "search songs") ? (
    <div> 
    <SelectSong1 handleAddSong={(song) => handleAddSong(song)} /> </div>
  ) : (
      <></> 
      
  );
  
  let showSelectMusic = wantsOwnPlaylist ? (
                <MusicSelect
              selectedMusicType={selectedMusicType}
              setSelectedMusicType={setSelectedMusicType}
            />

  ): (<></> );




  //          <SelectSong handleAddSong={(song) => handleAddSong(song)} />
  //  const handleAddSong = (newSong) => {
  //  post("/api/addSong", { song: newSong, gameCode: gameCode });
  // };

  let PopUpBox =
    displayPop === true ? (
      <div className = "popUpContainer">
        <div className="firstdiv"></div>
        <div className="popup">
          <div className="title column">advanced options</div>
          <div className="row space_between">
            <div className="text"> make game public </div>
            <input type="checkbox" name="switch" id="switch" onClick={() => handlePublic(event)} />
            <label for="switch"></label>
            <div className="text"> choose music </div>
            <input
              type="checkbox"
              name="switch"
              id="switch2"
              onClick={() => handleWantsOwnPlaylist(event)}
            />
            <label for="switch2"></label>
          </div>
          <div className="row space_between">
            <div className="text">
              num of questions:
              <div>
                <input
                  type="number"
                  id="questions"
                  name="questions"
                  min="0"
                  max="10000"
                  onChange={() => handleQuestions(event)}
                ></input>
              </div>
            </div>
            <div className="row space_between">
              <div className="text">
                time to answer:
                <input
                  type="number"
                  id="time"
                  name="time"
                  min="0"
                  max="10000"
                  onChange={() => handleTime(event)}
                ></input>
              </div>
            </div>
          </div>
          <div className="selectMusic">
            {showSelectMusic}
          </div>

          <div className="showPlaylists"> {choosePlaylists} </div>
          <div className="showGenres"> {chooseGenre} </div>
          <div className="showSearch"> {chooseSearch} </div>
          <div className="row space_evenly">
            <div className="title" onClick={() => handleCancel()}>
              cancel
            </div>
            <div onClick={() => submitGameOptions(event)} className="title">
              submit
            </div>
          </div>
        </div>
      </div>
    ) : (
      <> </>
    );


  const PopUp = () => {
    setDisplayPop(!displayPop);
    console.log(gameSettings);
  };

  const handleCancel =  () => {
     setDisplayPop(false);
    
    setVisible(false);
    setWantsOwnPlaylist(false);
    setTime(0);
    setPlaylists([]);
    setSelectedMusicType("");
                
    };

   const handleWantsOwnPlaylist =   () => {
      setWantsOwnPlaylist(!wantsOwnPlaylist);
     if (!wantsOwnPlaylist === false) {
       setSelectedMusicType("");
     }
   };

  const handlePublic = () => {
    setVisible(!isPublic);
  };

  const handleQuestions = (event) => {
    setQuestions(event.target.value);
    console.log(event.target.value);
  };

  const handleTime = (event) => {
    setTime(event.target.value);
    console.log(event.target.value);
  };

  const submitGameOptions = () => {
    console.log(JSON.stringify(gameSettings));
    post("/api/newGame", {
      settings: gameSettings,
      userId: props.userId,
      name: props.name,
      hostName: props.name,
    }).then((gameInfo) => {
      navigate(`/game/${gameInfo.gameCode}`, { state: gameInfo });
    });
  };

  return (
    <>
      <div className="options-button2 u-pointer" onClick={PopUp}>
        <div className="options-text">Advanced Options</div>
      </div>
      {PopUpBox}
    </>
  );
};

export default Options;
