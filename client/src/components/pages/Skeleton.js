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
      <NavBar/>
      <div className="u-flex u-flex-alignCenter u-flex-alignVertical">
        <img className="logo" src="/logo.png" height = "300px" width = "300px"/>
        {userId? (<div><h1>You are logged in</h1></div>):
        (<div><div id="login">
            <h1>First, log in to spotify</h1>
            <div className="login-button">
              <a href="/api/login">LOGIN TO PLAY</a>
              </div>
        </div></div>)}
      <h1>Identify is a super cool game!!!! so true</h1>
      <h2> What you need to change in this skeleton</h2>
      </div>
    </>
  );
};

export default Skeleton;
