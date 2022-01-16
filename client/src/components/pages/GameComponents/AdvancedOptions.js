import React, { useEffect, useState } from "react";
import "./AdvancedOptions.css";
import { Link } from "@reach/router";



const AdvancedOptions = (props) => {

    const gameOptions = () => {
        console.log("lezzgo");
        <div className="options-panel">
            hi hello how are you doing please work goddamn
        </div>
        console.log("woo");

/*         <div>
            <p>Select a maintenance drone:</p>

            <div>
            <input type="radio" id="huey" name="drone" value="huey"/>
            <label for="huey">Huey</label>
            </div>

            <div>
            <input type="radio" id="dewey" name="drone" value="dewey"/>
            <label for="dewey">Dewey</label>
            </div>
        </div> */
    }

    return (
      <div className="options-button u-pointer" >
        <div className="options-text" onClick={gameOptions}>
          {/* <Link to="/gametesting"> */}
            Advanced Options
          {/* </Link> */}
          </div>
      </div>
    );
}

export default AdvancedOptions;