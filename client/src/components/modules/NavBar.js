import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

const NavBar = () => {
  return (
    <div class="nav-list-container">
      <div class="nav-title">Identify</div>
      <div class="nav-elements">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="howtoplay"> how to play </a>
          </li>
        </ul>
        <ul class="nav-list">
          <li class="nav-item">
            <a href="profile"> profile </a>
          </li>
        </ul>

        <ul class="nav-list">
          <li class="nav-item">
            <a href="logout"> logout </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
