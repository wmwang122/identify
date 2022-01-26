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
         Log in with your Spotify account.
      </div>
      <div className="howtoplay-Login-Container">
        <img src="home_page_screenshot.png" className="howtoplay-Login"/>
        <div className="howtoplay-home_page_bottom">
          <div className="u-background-brightgreen howtoplay-home-button u-pointer" onClick={props.handleLogin}>
            Login to Play
          </div>
        </div>
      </div>
    </div>
    <div className="howtoplay-Container">
    <div className="howtoplay-number-container">2</div>
      <div className="howtoplay-Text">
        Either create a game or join an existing game using a room code.
      </div>
      <div className="howtoplay-Image-Container">
        <img src="howtoplay-step2.png" className="howtoplay-Image"/>
      </div>
    </div>
    <div className="howtoplay-Container">
    <div className="howtoplay-number-container">3</div>
      <div className="howtoplay-Text">
      If you are the room host, select room settings / choose music to queue.
      </div>
      <div className="howtoplay-Image-Container">
        <img src="howtoplay-step3.png" className="howtoplay-Image"/>    
      </div>
    </div>
    <div className="howtoplay-Container">
    <div className="howtoplay-number-container">4</div>
      <div className="howtoplay-Text">
        Once the game starts, songs will play one by one. Click buzz or press spacebar when you know the answer.
      </div>
      <div className="howtoplay-Image-Container">
        <img src="howtoplay-step4.png" className="howtoplay-Image"/>
      </div>
    </div>
    <div className="howtoplay-Container">
    <div className="howtoplay-number-container">5</div>
      <div className="howtoplay-Text">
      A textbox will then appear, and you can type your answer in.
      </div>
      <div className="howtoplay-Image-Container">
        <img src="howtoplay-step5.png" className="howtoplay-Image"/>
      </div>
    </div>
    <div className="howtoplay-Container">
    <div className="howtoplay-number-container">6</div>
      <div className="howtoplay-Text">
        You will earn 10 points per correct answer and lose 5 points for each incorrect answer. If you buzz before the 15 second mark, you will receive 15 points.
      </div>
      <div className="howtoplay-Image-Container">
        
      </div>
    </div>
    </>
    );};
       
    
    
    
    
    

export default HowToPlay;


