import React, { useEffect } from "react";
import { Link, useLocation } from "@reach/router";
import { useState } from "react";

import "./NavBar.css";

const NavBar = (props) => {
  const [location, setLoc] = useState("/");
  useEffect(() => {
    setLoc(window.location.pathname);
    console.log("location changed: " + location);
  }, [window.location.pathname]);
  console.log("location: " + location);
  let toggleState = props.userId ? (
    <ul className="nav-item u-pointer fixed-width-medium" onClick={props.handleLogout}>
      Logout
    </ul>
  ) : (
    <ul className="nav-item u-pointer fixed-width-medium" onClick={props.handleLogin}>
      Login
    </ul>
  );
  return (
    <>
      {props.userId ? (
        <div className="nav-list-container">
          <div className="nav-title-container">
            <Link to="/" className="nav-title">
              Identify
            </Link>
          </div>
          <div className="nav-elements">
            <ul className="nav-item fixed-width-large">
              <Link to="/lobby">Play a Game</Link>
            </ul>
            <ul className="nav-item fixed-width-large">
              <Link to="/howtoplay">Instructions</Link>
            </ul>
            <ul className="nav-item fixed-width-medium">
              <Link to="/profile">Profile</Link>
            </ul>
            {toggleState}
          </div>
        </div>
      ) : location === "/howtoplay" ? (
        <div className="nav-list-container">
          <div className="nav-title-container">
            <Link to="/" className="nav-title">
              Identify
            </Link>
          </div>
          <div className="nav-elements">
            <ul className="nav-item fixed-width-large">
              <Link to="/howtoplay">Instructions</Link>
            </ul>
            {toggleState}
          </div>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};

export default NavBar;
