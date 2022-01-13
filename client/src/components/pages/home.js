import React, { Component, useEffect } from "react";
import "../../utilities.css";
import "./Home.css";

const Home = (props) => {
  var homeButton = props.userId ? (
    <>
      <div className="login-button">get You're logged in!</div>
      <div>You are currently logged in as: {JSON.stringify(props.userId)}</div>
    </>
  ) : (
    <div className="login-button u-pointer" onClick={props.handleLogin}>
      LOGIN TO PLAY
    </div>
  );
  return (
    <div className="u-flex u-flex-alignCenter u-flex-alignVertical">
      <img src="/logo.png" height="250px" width="250px" className="blue-backing" />
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
