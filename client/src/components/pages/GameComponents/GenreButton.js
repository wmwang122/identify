import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import "./GenreSelect.css";
import GenreButton from "./GenreButton.js";

const GenreButton = (props) => {
    const handleClick = () => {
        get("/api/searchByGenreSpotify", {genre: props.genre}).then((data) => {
            console.log(data);
        });
    };
    return (
      <div className="genreButton-container" onClick={()=>handleClick()}>
          <div className="genreButton-text">
            {props.genre}
          </div>
      </div>
    );
  };
  
  export default GenreButton;