import React, { useEffect, useState } from "react";
import "./Options.css";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";
import { get, post } from "../../../utilities.js";
import Playlists from "./Playlists.js";

const Options = (props) => {
  const [displayPop, setDisplayPop] = useState(false);
  const [isPublic, setVisible] = useState(false);
  const [wantsOwnPlaylist, setWantsOwnPlaylist] = useState(false);
  const [numberQuestions, setQuestions] = useState(0);
  const [time, setTime] = useState(0);
  const [playlists, setPlaylists] = useState([]);

  let gameSettings = {isPublic:isPublic, wantsOwnPlaylist:wantsOwnPlaylist, numberQuestions:numberQuestions, time:time, playlistIDs:playlists};

  let displayPlaylists = wantsOwnPlaylist ? (
    <div>
    <Playlists selectedPlaylists={playlists}/>
    </div>
  ) : (
    <div>
    </div>
  );

  let PopUpBox =
    displayPop === true ? (
      <>
        <div className="firstdiv"></div>
        <div className="popup">
          <div className="title column">advanced options</div>
          <div className="row space_between">
            <div className="text"> make game public </div>
            <input type="checkbox" name="switch" id="switch" onClick={() => handlePublic(event)} />
            <label for="switch"></label>
            <div className="text"> use my own playlists </div>
            <input type="checkbox" name="switch" id="switch2" onClick={() => handleWantsOwnPlaylist(event)}/>
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
          <div className="row space_evenly">
            <div className="title" onClick={() => setDisplayPop(event)}>
              cancel
            </div>

          </div>
          <div> 
          {displayPlaylists} </div> 
          <div onClick={() => submitGameOptions(event)} className="title"> 
          submit
          </div>
        </div>
      </>
    ) : (
      <> </>
    );

  const PopUp = () => {
    setDisplayPop(!displayPop);
  };

  const handleWantsOwnPlaylist = () => {
    setWantsOwnPlaylist(!wantsOwnPlaylist);
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
    post("/api/newGame", { settings: gameSettings, userId: props.userId, name: props.name,hostName: props.name,}).then((gameInfo) => {
      navigate(`/game/${gameInfo.gameCode}`, { state: gameInfo });
    });
  };




  return (
    <>
    <div className="options-button2 u-pointer" onClick={PopUp}>
      <div className="options-text">
        Advanced Options
      </div>
      <div className="options-description">
      Choose your own songs, set private mode, and more to customize your identify experience!
      </div>
    </div>
    {PopUpBox}
    </>
  );

  return (
    <div className="popup">
      <div className="title column">advanced options</div>
      <div className="row space_between">
        <div className="text"> make game public </div>
        <input type="checkbox" name="switch" id="switch" onClick={handlePublic} />
        <label for="switch"></label>
        <div className="text"> use my own playlists </div>
        <input type="checkbox" name="switch" id="switch2" />
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
              onChange={handleQuestions}
            ></input>
          </div>
        </div>
        <div className="row space_between">
            time to answer:
            <input
              type="number"
              id="time"
              name="time"
              min="0"
              max="10000"
              onChange={handleTime}
            ></input>
        </div>
      </div>
      <div className="row space_evenly">
        <div className="title"> cancel </div>
        <div onClick={() => submitGameOptions()} className="title">
          submit
        </div>
      </div>
    </div>
  );

};

export default Options;
