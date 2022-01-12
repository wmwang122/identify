import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

const NavBar = () => {
  return (
    <div class="nav-list-container">
      <div class="nav-title">identify</div>
      <div class="nav-elements">
      <ul class="nav-item">
          <Link to="/howtoplay">
            how to play
          </Link>
        </ul>
        <ul class="nav-item">
          <Link to="/profile">
            profile
          </Link>
        </ul>

        <ul className="nav-item">
          <Link to="/logout">
            logout
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
