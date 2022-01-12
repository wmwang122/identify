import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import NavBar from "../modules/NavBar.js";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <NavBar />
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
        {userId ? (
          <div>
            <h1>You are logged in</h1>
          </div>
        ) : (
          <div>
            <div id="login">
                <h1 className="u-font">First, log in to spotify</h1>
                <div className="login-button">
                  <a href="/api/login">Log in</a>
                  </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Skeleton;