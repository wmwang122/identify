import React, { useEffect } from "react";
import { Link, useLocation } from "@reach/router";
import { useState } from "react";

import "./NavBar.css";

const NavBar = (props) => {
  let toggleState = props.userId ? (
    <ul className="nav-item u-pointer fixed-width-log nav-last" onClick={props.handleLogout}>
      Logout
    </ul>
  ) : (
    <ul className="nav-item u-pointer fixed-width-log nav-last" onClick={props.handleLogin}>
      Login
    </ul>
  );
  return (
        <div className="nav-list-container">
          <div className="nav-title-container">
            <a href="/" className="nav-title">
              Identify
            </a>
          </div>
          <div className="nav-elements">
            {props.userId?<ul className="nav-item fixed-width-play">
              <Link to="/lobby">Play a Game</Link>
            </ul>:<></>}
            <ul className="nav-item fixed-width-instructions">
              <Link to="/howtoplay">Instructions</Link>
            </ul>
            {props.userId?<ul className="nav-item fixed-width-profile">
              <Link to="/profile">Profile</Link>
            </ul>:<></>}
            {toggleState}
          </div>
        </div>
  );
};

export default NavBar;
