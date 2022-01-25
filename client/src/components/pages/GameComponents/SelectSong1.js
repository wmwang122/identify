import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import { get, post } from "../../../utilities.js";
import "./SelectSong1.css";
import SongDisplay1 from "./SongDisplay1.js";

const SelectSong1 = (props) => {
  const [value, setValue] = useState("");
  const [songArray, setSongArray] = useState([]);
  const [selecting, setSelecting] = useState(false);
  let output = [];
  for (let i = 0; i < songArray.length; i++) {
    output.push(
      <SongDisplay1 song={songArray[i]} handleAddSong={(song) => props.handleAddSong(song)} />
    );
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    get("/api/searchSpotify", { query: value }).then((data) => {
      setSongArray(data);
    });
  };
  const handleCloseSelect = () => {
    setSelecting(false);
  };

  const handleOpenSelect = () => {
    setSelecting(true);
  };

  return (
    <div className="select-song-window1">
      <div className="selectPopup-header1">
        <div className="selectSonginline">
          <input
            type="text"
            placeholder={props.defaultText}
            value={value}
            onChange={(data) => handleChange(data)}
            className="displayInLine"
          />
          <div className="searchButton u-pointer displayInLine" onClick={() => handleSubmit()}>
            <div className="searchButton-text">search </div>
          </div>
        </div>
      </div>
      <div className="selectPopup-content1">{output}</div>
    </div>
  );
};

export default SelectSong1;
