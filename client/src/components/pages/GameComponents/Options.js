import React, { useEffect, useState } from "react";
import "./Options.css";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";
import { get, post } from "../../../utilities.js";
import Playlists from "./Playlists.js";
import GenreSelect from "./GenreSelect.js";
import SelectSong1 from "./SelectSong1.js";
import MusicSelect from "./MusicSelect.js";
import "../../../utilities.css";

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
    <div className="showPlaylists">
      <Playlists selectedPlaylists={playlists} />
    </div>
  ) : (
    <></>
  );

  let chooseGenre = (selectedMusicType === "genres") ? (
    <div className="showGenres">
      <GenreSelect />
    </div>) : (
    <></>
  );

  let chooseSearch = (selectedMusicType === "search songs") ? (
    <div className="showSearch"> 
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
      <div className="popUpContainer">
        <div className="firstdiv"></div>
        <div className="popup">
          <div className="title column space_between">Advanced Options</div>
          <div className="row space_between inline">
            <div className=" row space_between"> 
            <div className="column1 column-marginright">
              <div className="row space_evenly inline">
                {" "}
                <div className="text"> Make Game Public </div>
                <input
                  type="checkbox"
                  name="switch"
                  id="switch"
                  onClick={() => handlePublic(event)}
                />
                <label for="switch"></label>
              </div>
              <div className="row space_evenly inline left-align">
                <div className="text">
                  # of Questions:
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
              </div>
            </div>
            <div className="column1">
              <div className="row space_evenly inline">
                <div className="text"> Choose Music </div>
                <input
                  type="checkbox"
                  name="switch"
                  id="switch2"
                  onClick={() => handleWantsOwnPlaylist(event)}
                />
                <label for="switch2"></label>
              </div>
              <div className="row space_evenly inline">
                <div className="text">
                  Time to Answer:
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
              </div>
          </div>
          <div className="selectMusic">{showSelectMusic}</div>

          {choosePlaylists}
          {chooseGenre}
          {chooseSearch}
          <div className="row center inline">
            <div className="cancel-submit u-pointer"  onClick={() => handleCancel()}>
              Cancel
            </div>
            <div onClick={() => submitGameOptions(event)} className="cancel-submit u-pointer cancel-submit-marginleft">
              Submit
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
