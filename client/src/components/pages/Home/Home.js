import React, { Component, useEffect } from "react";
import "../../../utilities.css";
import "./Home.css";
//import Name from "../../Name.js";

const Home = (props) => {
  var homeButton = props.userId ? (
    <>
      <div className="login-button">You are logged in!</div>
      <div>
        {" "}
        Welcome {" "}
      </div>
    </>
  ) : (
    <div className="login-button u-pointer" onClick={props.handleLogin}>
      LOGIN TO PLAY
    </div>
  );
  return (
    <div className="u-flex u-flex-alignCenter u-flex-alignVertical">
      <div className="logo-backing">
        <img src="logo.png" height="225px" width="225px" />
      </div>
      <h1 className="u-font">"Imagine Dragons!"</h1>
      <div className="home-instructions">
        <div className="home-instruction">
          <div className="home-circle u-background-turquoise">1</div>connect
        </div>
        <div className="home-instruction">
          <div className="home-circle u-background-turquoisegreen">2</div>listen
        </div>
        <div className="home-instruction">
          <div className="home-circle u-background-brightgreen">3</div>guess
        </div>
        <div className="home-instruction">
          <div className="home-circle u-background-lightbrightgreen">4</div>win
        </div>
      </div>
      {homeButton}
    </div>
  );
};

export default Home;
