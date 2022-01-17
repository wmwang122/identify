import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import { get, post } from "../../../utilities.js";
import "./GamePlayer.css";

const SongPlayer = (props) => {
  const [source, setSource] = useState(null);
  const [num, setNum] = useState(null);
  useEffect(() => {
    setSource(props.tracks);
    setNum(props.num);
    console.log("why");
  }, []);
  const comp =
    num && source ? (
      <audio controls="controls">
        <source src={source[num].preview_url} type="audio/mpeg" />
        ßß
      </audio>
    ) : (
      <div>No current song</div>
    );
  //return <>{comp}</>;
  return <div>{num}</div>;
}; //TODOOOOO

export default SongPlayer;
