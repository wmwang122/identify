import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

const NavBar = (props) => {
  var toggleState = props.userId?(<ul className="nav-item u-pointer fixed-width-medium" onClick={props.handleLogout}>
  logout
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
            play a game
          </Link>
      </ul>):<></>}
      <ul className="nav-item fixed-width-large">
          <Link to="/howtoplay">
            instructions
          </Link>
        </ul>
        {props.userId?(<ul className="nav-item fixed-width-medium">
          <Link to="/profile">
            profile
          </Link>
        </ul>):(<></>)}
        {toggleState}
      </div>
    </div>
  );
};

export default NavBar;
