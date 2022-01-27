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

  let toggleStateSettings = props.userId ? (
    <div className="navbar-drop-elt2 u-pointer" onClick={props.handleLogout}>
      Logout
    </div>
  ) : (
    <div className="navbar-drop-elt2 u-pointer" onClick={props.handleLogin}>
      Login
    </div>
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
              <Link to="/lobby">Play</Link>
            </ul>:<></>}
            <ul className="nav-item fixed-width-instructions">
              <Link to="/howtoplay">Instructions</Link>
            </ul>
            {props.userId?<ul className="nav-item fixed-width-profile">
              <Link to="/profile">Profile</Link>
            </ul>:<></>}
            {toggleState}
          </div>
          <div className = "navbar-dropdown">
              <div className = "navbar-dropbutton">Pages
                <i className="fa fa-caret-down"></i>
              </div>
              <div className = "navbar-drop-content">
              <Link to="/lobby">
                <div className = "navbar-drop-elt">
                  Play
                </div>
                </Link>
                <Link to ="/howtoplay">
                <div className = "navbar-drop-elt">
                Instructions
                </div>
                </Link>
                <Link to="/profile">
                <div className = "navbar-drop-elt">
                Profile
                </div>
                </Link>
                {toggleStateSettings}
              </div>
            </div>
        </div>
  );
};

export default NavBar;
