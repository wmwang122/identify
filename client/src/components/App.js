import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Game from "./pages/Game.js";
import NavBar from "./modules/NavBar.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import HowToPlay from "./pages/howtoplay.js"

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const componentDidMount = () => {
    get("/api/whoami").then((user)=> {
      if(user._id){
        setUserId(user._id);
      }
    });
  }

  const handleLogin = () => {
    get("/api/spotifyLogin").then((data) => {
      console.log((data))
      window.location.href = data.url
    })
  };

  const handleLogout = () => {
    setUserId(undefined);
    console.log("logging out")
    post("/api/logout");
  };

  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId}/>
      <Router>
        <Home path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId}/>
        <Game path="/lobby" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
        <Profile path="/profile" userId={userId}/>
        <NotFound default />
        <HowToPlay path="/howtoplay" userId={userId}/>
      </Router>
    </>
  );
};

export default App;
