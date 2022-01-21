import React, { useState, useEffect } from "react";
import "./InGame.css";

// help from https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks

const Countdown = (props) => {
  const [timeLeft, setTimeLeft] = useState(props.time);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setIsActive(false);
    setTimeLeft(props.time);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
      if (timeLeft <= 0) {
        clearInterval(interval);
        setIsActive(false);
        props.end();
      }
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (props.userExists) {
      setIsActive(true);
    } else {
      reset();
    }
  }, [props.userExists]);

  useEffect(() => {
    if(props.forceReset){
      reset();
    }
  }, [props.forceReset])

  const buttonText = isActive ? "pause" : "start";
  //const button = props.visible?(<button onClick={toggle}>{buttonText}</button>):<></>;

  return (
    <div>
      <div>{timeLeft}s</div>
    </div>
  );
};

export default Countdown;
