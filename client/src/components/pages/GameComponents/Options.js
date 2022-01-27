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
  const [selectedMusicType, setSelectedMusicType] = useState("");
  const [selectedSongs, setSelectedSongs] = useState(null);

  useEffect(() => {
    console.log(selectedSongs);
  }, [selectedSongs]);

  let gameSettings = {
    isPublic: isPublic,
    wantsOwnPlaylist: wantsOwnPlaylist,
    numberQuestions: numberQuestions,
    time: time,
    selectedSongs: selectedSongs,
  };

  let choosePlaylists =
    selectedMusicType === "my playlists" ? (
      <div className="showPlaylists">
        <Playlists setSelected={(data) => setSelectedSongs(data)} />
      </div>
    ) : (
      <></>
    );

  let chooseGenre =
    selectedMusicType === "genres" ? (
      <div className="showGenres">
        <GenreSelect setSelected={(data) => setSelectedSongs(data)} />
      </div>
    ) : (
      <></>
    );

  let chooseSearch =
    selectedMusicType === "search songs" ? (
      <div className="showSearch">
        <SelectSong1 setSelected={(data) => setSelectedSongs(data)} />{" "}
      </div>
    ) : (
      <></>
    );

  let showSelectMusic = wantsOwnPlaylist ? (
    <MusicSelect
      selectedMusicType={selectedMusicType}
      setSelectedMusicType={setSelectedMusicType}
    />
  ) : (
    <></>
  );

  let giveChoices = wantsOwnPlaylist ? (
    <>
      {" "}
      {choosePlaylists}
      {chooseGenre}
      {chooseSearch}{" "}
    </>
  ) : (
    <> </>
  );

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
                <div className="text"> Make Game Public </div>
                <input
                  type="checkbox"
                  name="switch"
                  id="switch"
                  onClick={() => handlePublic()}
                />
                <label for="switch" className="optionsHandle"></label>
              </div>
              <div className="column1">
                <div className="row space_evenly inline add-margin-top">
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
            <div className="column1">
              <div className="row space_evenly inline">
                <div className="text"> Choose Music </div>
                <input
                  type="checkbox"
                  name="switch"
                  id="switch2"
                  onClick={() => handleWantsOwnPlaylist(event)}
                />
                <label for="switch2" className="optionsHandle"></label>
              </div>
              <div className="row space_evenly inline add-margin-top">
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

          {giveChoices}
          <div className="row center inline">
            <div className="cancel-submit u-pointer" onClick={() => handleCancel()}>
              Cancel
            </div>
            <div
              onClick={() => submitGameOptions(event)}
              className="cancel-submit u-pointer cancel-submit-marginleft"
            >
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

  const handleCancel = () => {
    setDisplayPop(false);

    setVisible(false);
    setWantsOwnPlaylist(false);
    setTime(0);
    setPlaylists([]);
    setSelectedMusicType("");
  };

  const handleWantsOwnPlaylist = () => {
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

  const makeGame = (trackList) => {
    post("/api/newGame", {
      settings: gameSettings,
      userId: props.userId,
      name: props.name,
      hostName: props.name,
      trackList: trackList,
    }).then((gameInfo) => {
      navigate(`/game/${gameInfo.gameCode}`, { state: gameInfo });
    });
  };

  const submitGameOptions = async () => {
    let num = numberQuestions > 0 ? (numberQuestions <= 25 ? numberQuestions : 25) : 10;
    console.log(JSON.stringify(gameSettings));
    if (gameSettings.selectedSongs && gameSettings.selectedSongs.type) {
      if (gameSettings.selectedSongs.type === "playlists") {
        get("/api/getSongsFromPlaylists", {
          playlists: gameSettings.selectedSongs.playlists,
          num: num,
        }).then((songs) => {
          makeGame(songs);
        });
      } else if (gameSettings.selectedSongs.type === "genre") {
        get("/api/searchByGenreSpotify", {
          genre: gameSettings.selectedSongs.genre,
          num: num,
        }).then((songs) => {
          makeGame(songs);
        });
      } else if (gameSettings.selectedSongs.type === "select") {
        makeGame(gameSettings.selectedSongs.selectedSongs);
      } else {
        get("/api/getPopularSongs", { num: num }).then((songs) => {
          makeGame(songs);
        });
      }
    } else {
      get("/api/getPopularSongs", { num: num }).then((songs) => {
        makeGame(songs);
      });
    }
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
