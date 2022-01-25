import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import { get, post } from "../../../utilities.js";
import "./MusicTypeButton.css";

const MusicTypeButton = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    setIsSelected(!isSelected);
    props.setSelectedMusicType(props.musicType);
    console.log("genre changed to: ", props.musicType);
  };

  useEffect(() => {
    if (props.musicType !== props.selectedMusicType) {
      setIsSelected(false);
    }
  }, [props.selectedMusicType]);

  let changeColor = isSelected ? (
    <div
      className="musicButton-container musicButton-selected u-pointer"
      onClick={() => handleClick()}
    >
      <div className="musicButton-text">{props.musicType}</div>
    </div>
  ) : (
    <div className="musicButton-container u-pointer" onClick={() => handleClick()}>
      <div className="musicButton-text">{props.musicType}</div>
    </div>
  );
  return <div>{changeColor} </div>;
};

export default MusicTypeButton;
