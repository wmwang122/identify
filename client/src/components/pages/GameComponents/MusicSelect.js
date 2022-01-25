import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import { get, post } from "../../../utilities.js";
import "./GenreSelect.css";
import GenreButton from "./GenreButton.js";
import MusicTypeButton from "./MusicTypeButton.js";
import "./MusicSelect.css";

const MusicSelect = (props) => {

  return (
    <div className="genreSelect-container">
      <div className="musicSelect-title">choose music</div>
      <div className="musicSelect-content">
        <MusicTypeButton
          musicType="my playlists"
          selectedMusicType={props.selectedMusicType}
          setSelectedMusicType={props.setSelectedMusicType}
        />
        <MusicTypeButton
          musicType="genres"
          selectedMusicType={props.selectedMusicType}
          setSelectedMusicType={props.setSelectedMusicType}
        />
        <MusicTypeButton
          musicType="search songs"
          selectedMusicType={props.selectedMusicType}
          setSelectedMusicType={props.setSelectedMusicType}
        />
      </div>
    </div>
  );
};

export default MusicSelect;
