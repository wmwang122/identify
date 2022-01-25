import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import "./GenreSelect.css";
import GenreButton from "./GenreButton.js";

const GenreSelect = (props) => {
    const genres = ["country", "disney", "emo", "folk", "hip-hop", "indie", "latino", "pop", "rock", "techno"];
    let genreButtons = [];
    for(let i = 0; i < genres.length; i++){
        genreButtons.push(<GenreButton genre={genres[i]}/>);
    }
    return (
      <div className="genreSelect-container"> 
        <div className="genreSelect-title">
            Select a genre of music
        </div>
        <div className="genreSelect-content">
            {genreButtons}
        </div>
      </div>
    );
  };
  
  export default GenreSelect;