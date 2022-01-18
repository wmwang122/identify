import React, { useEffect, useState } from "react";
const [isVisible, setVisible] = useState(false);
    const GameOptions1 = () => {
        setVisible(true);
        console.log("lezzgo");
        console.log("woo");
        let desiredClass = "";
        if(isVisible)
        {
            desiredClass = "options-panel-open";
        }
        else{
            desiredClass = "options-panel-closed";
        }

        let displaytext = isVisible ?
            (<div className="options-panel-open">
                 hi hello how are you doing please work goddamn
             </div>) : (<div className="options-panel-closed">
                 hi hello how are you doing please work goddamn
             </div>);
        return(

            {displaytext}
        
        );
    
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

export default GameOptions1;