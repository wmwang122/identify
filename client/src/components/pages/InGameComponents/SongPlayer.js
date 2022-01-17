import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import { get, post } from "../../../utilities.js";
import "./GamePlayer.css";

const SongPlayer = (props) => {
  const [source, setSource] = useState(null);
  const [num, setNum] = useState(null);
  const [myAudio, setMyAudio] = useState(null);
  useEffect(() => {
    console.log("num");
    setSource(props.tracks);
    setNum(props.num);
  }, [props]);
  const comp =
    num && source ? (
      <>
        <div>{num}</div>
        <audio controls="controls">
          <source src={source[num].preview_url} type="audio/mpeg" />
          ßß
        </audio>
      </>
    ) : (
      <div>No current song</div>
    );
  return <>{comp}</>;
}; //TODOOOOO

export default SongPlayer;
