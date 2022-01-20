import React, { Component, useEffect, useState } from "react";
import { Router } from "@reach/router";
import "../../utilities.css";
import "./Profile.css";
import { get, post } from "../../utilities.js";
import "./howtoplay.css"

const HowToPlay = (props) => {
    return (
      <>
    <div className="howtoplay-Container">
      <div className="howtoplay-number-container">1</div>
      <div className="howtoplay-Text">
         log in with your spotify account
      </div>
      <div className="howtoplay-Image-Container">
        <img src="home_page_screenshot.png" className="howtoplay-Image"/>
        <div className="howtoplay-home_page_bottom">
          <div className="u-background-brightgreen howtoplay-home-button u-pointer" onClick={props.handleLogin}>
            login to play
          </div>
        </div>
      </div>
    </div>
    <div className="howtoplay-Container">
    <div className="howtoplay-number-container">2</div>
      <div className="howtoplay-Text">
        either create a game or join an existing game using a room code
      </div>
      <div className="howtoplay-Image-Container">

      </div>
    </div>
    <div className="howtoplay-Container">
    <div className="howtoplay-number-container">3</div>
      <div className="howtoplay-Text">
      if you are the room host, select room settings / choose playlists to upload
      </div>
      <div className="howtoplay-Image-Container">
        
      </div>
    </div>
    <div className="howtoplay-Container">
    <div className="howtoplay-number-container">4</div>
      <div className="howtoplay-Text">
        once the game starts, songs will play one by one. click buzz or press spacebar when you know the answer.
      </div>
      <div className="howtoplay-Image-Container">
        
      </div>
    </div>
    <div className="howtoplay-Container">
    <div className="howtoplay-number-container">5</div>
      <div className="howtoplay-Text">
      a textbox will then appear, and you can type your answer in
      </div>
      <div className="howtoplay-Image-Container">
        
      </div>
    </div>
    <div className="howtoplay-Container">
    <div className="howtoplay-number-container">6</div>
      <div className="howtoplay-Text">
        you will earn ten points per correct answer and lose five points for each incorrect answer
      </div>
      <div className="howtoplay-Image-Container">
        
      </div>
    </div>
    </>
    );};
       
    
    
    
    
    

export default HowToPlay;


