import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import "./GenreButton.css";

const GenreButton = (props) => {
  const [isSelected, setIsSelected] = useState(false);
    const handleClick = () => {
        get("/api/searchByGenreSpotify", {genre: props.genre}).then((data) => {
            console.log(data);
        });
      setIsSelected(!isSelected);
      props.setSelectedGenre(props.genre);
      console.log("genre changed to: ", props.genre);
    };
  
  useEffect(() => {

    if (props.genre !== props.selectedGenre) {
      setIsSelected(false);
    };
    }, [props.selectedGenre]);

  
  let changeColor = isSelected ? (
    <div className="genreButton-container genreButton-selected u-pointer" onClick={() => handleClick()}>
      <div className="genreButton-text">{props.genre}</div>
    </div>
  ) : (
    <div className="genreButton-container u-pointer" onClick={() => handleClick()}>
      <div className="genreButton-text">{props.genre}</div>
    </div>
  );
  return <div>{changeColor} </div>;
  };
  
  export default GenreButton;