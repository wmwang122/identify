import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import NavBar from "../modules/NavBar.js";
import Home from "./Home.js";
import Game from "./Game.js";

import "../../utilities.css";
//import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <NavBar />
      <Home userId={userId} handleLogin = {handleLogin} handleLogout = {handleLogout}/>
      <Game userId={userId} />
    </>
  );
};

export default Skeleton;
