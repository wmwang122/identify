import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

const NavBar = (props) => {
  var toggleState = props.userId?(<ul className="nav-item u-pointer fixed-width-medium" onClick={props.handleLogout}>
  Logout
</ul>):(<ul className="nav-item u-pointer fixed-width-medium" onClick={props.handleLogin}>
  login
</ul>);
  return (
    <div className="nav-list-container">
      <div className="nav-title-container">
        <Link to="/" className="nav-title">
          Identify
        </Link>
        </div>
      <div className="nav-elements">
      {props.userId?(<ul className="nav-item fixed-width-large">
          <Link to="/lobby">
            Play a Game
          </Link>
      </ul>):<></>}
      <ul className="nav-item fixed-width-large">
          <Link to="/howtoplay">
            Instructions
          </Link>
        </ul>
        {props.userId?(<ul className="nav-item fixed-width-medium">
          <Link to="/profile">
            Profile
          </Link>
        </ul>):(<></>)}
        {toggleState}
      </div>
    </div>
  );
};

export default NavBar;
