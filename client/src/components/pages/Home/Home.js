import React, { Component, useEffect } from "react";
import "../../../utilities.css";
import "./Home.css";
import Name from "./Name.js";

const Home = (props) => {
  var homeButton = props.userId ? (
    <>
      <div
        className="login-button u-pointer u-fade-in-pop inst-delay-5"
        onClick={() => {
          location.href = "/lobby";
        }}
      >
        <div className="login-back">Play a Game</div>
        <div className="login-front">Play a Game</div>
      </div>
    </>
  ) : (
    <div className="login-instruction">
      <div
        className="login-button u-pointer u-fade-in-pop inst-delay-5"
        onClick={props.handleLogin}
      >
        <div className="login-back">Login to Play</div>
        <div className="login-front">Login to Play</div>
      </div>
      <div
        className="instruction-button u-pointer u-fade-in-pop inst-delay-5"
        onClick={() => {
          location.href = "/howtoplay";
        }}
      >
        <div className="instruction-back">Instructions</div>
        <div className="instruction-front">Instructions</div>
      </div>
    </div>
  );
  return (
    <div className="u-flex u-flex-alignCenter u-flex-alignVertical">
      <div className="logo-backing">
        <img src="logo.png" className="home-logo" />
      </div>
      <h1 className="u-font home-quote">"Imagine Dragons!"</h1>
      <div className="home-instructions">
        <div className="home-instruction u-fade-in-pop inst-delay-1">
          <div className="home-circle u-background-turquoise">1</div>connect
        </div>
        <div className="home-instruction u-fade-in-pop inst-delay-2">
          <div className="home-circle u-background-turquoisegreen">2</div>listen
        </div>
        <div className="home-instruction u-fade-in-pop inst-delay-3">
          <div className="home-circle u-background-brightgreen">3</div>guess
        </div>
        <div className="home-instruction u-fade-in-pop inst-delay-4">
          <div className="home-circle u-background-lightbrightgreen">4</div>win
        </div>
      </div>
      {homeButton}
    </div>
  );
};

export default Home;
