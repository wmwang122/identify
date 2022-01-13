import React, { Component, useEffect, useState } from "react";
import { Router } from "@reach/router";
import "../../utilities.css";
import "./Profile.css";
import { get, post } from "../../utilities.js";
import "./howtoplay.css"

const HowToPlay = (props) => {
    return (
  
    <div className="container  u-flex-alignVertical instructions-button">
          <div>1. log in with your spotify account </div>
          <div>2. either create a game or join an existing game using a room code </div>
          <div>3. if you are the room host, select room settings / choose playlists to upload </div>
          <div>4. once the game starts, songs will play one by one. click buzz or press spacebar when you know the answer.</div>
          <div>5. a textbox will then appear, and you can type your answer in </div>
          <div>6. you will earn ten points per correct answer and lose five points for each incorrect answer </div>
          
    </div>
  );
}; 

export default HowToPlay;


