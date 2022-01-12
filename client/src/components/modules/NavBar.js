import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

const NavBar = () => {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title">identify</div>
        <div className="NavBar-linkContainer u-inlineBlock">
          <Link to="/" className="NavBar-link">
            Home
          </Link>
        </div>
      </nav>
    );
};

export default NavBar;
