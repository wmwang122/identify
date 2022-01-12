import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">identify</div>
      <div className="NavBar-linkContainer u-inlineBlock body">
        <Link to="/howtoplay" className="NavBar-link NavBar-button">
          how to play
        </Link>
        <Link to="/profile" className="NavBar-link">
          profile
        </Link>
        <Link to="/logout" className="NavBar-link">
          log out
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
