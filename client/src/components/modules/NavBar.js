import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

const NavBar = () => {
    return (

        <div class="nav-list-container">
            <ul class="nav-list">
                <li class="nav-item">
                    <a href="#"> identify </a>
                </li>
            </ul>
            
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#"> how to play </a>
            </li>
                
          </ul>
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#"> profile </a>
            </li>
          </ul>
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#"> logout </a>
            </li>
          </ul>
        </div>
    );
    };


export default NavBar;
