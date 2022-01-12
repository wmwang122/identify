import React from "react";
import { Link } from "@reach/router";

import "./Button.css";

const Button = (props) => {
  return (
    <nav className="Button-container">
      <div className="Button-title"> {props.title} </div>
      <div className="Button-linkContainer u-inlineBlock">
        <Link to="/" className="Button-link">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
