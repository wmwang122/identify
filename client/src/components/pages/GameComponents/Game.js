import React, { Component } from "react";
import "./Skeleton.css";
import NavBar from "../modules/NavBar.js";

const Game = ({ props }) => {
  return (
    <div>
      <Navbar />
      <Biography />
      <h1>Recently Added Songs</h1>
      {props.user.songs.map((song) => (
        <SongList song={song._id} />
      ))}
      <SpotifyLink />
    </div>
  );
};
