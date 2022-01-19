import React, { useEffect, useState } from "react";
import "./AdvancedOptions.css";
import { Link } from "@reach/router";
//import GameOptions1 from "./GameOptions1.js";
import Options from "./Options.js"
const AdvancedOptions = (props) => {
    const [isVisible, setVisible] = useState(false);

    const displayGameOpt = (props) =>
    {
        setVisible(!isVisible);
    }
     let displaytext = isVisible ?
    (<div className="options-panel-open">
         <Options userId={props.userId}/>
     </div>) : (<div className="options-panel-closed">
        <Options />
     </div>);

     //var textBox = (isVisible) ? <div>  hi  </div> : <div> hello </div>;
    
     return(
            <div className="options-button u-pointer">
                <div className="options-text" onClick={displayGameOpt}>Advanced Options</div>
                {displaytext}
            </div>);
}

export default AdvancedOptions;