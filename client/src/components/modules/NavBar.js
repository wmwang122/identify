import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

const NavBar = (props) => {
  var toggleState = props.userId?(<ul className="nav-item u-pointer" onClick={props.handleLogout}>
  logout
</ul>):(<ul className="nav-item u-pointer" onClick={props.handleLogin}>
  login
</ul>);
  return (
    <div className="nav-list-container">
      <div className="nav-title">
        <Link to="/">
          Identify
        </Link>
        </div>
      <div className="nav-elements">
        <ul className="nav-item">
          <Link to="/lobby">
            play a game
          </Link>
      </ul>
      <ul className="nav-item">
          <Link to="/howtoplay">
            instructions
          </Link>
        </ul>
        <ul className="nav-item">
          <Link to="/profile">
            profile
          </Link>
        </ul>
        {toggleState}
      </div>
    </div>
  );
};

export default NavBar;
