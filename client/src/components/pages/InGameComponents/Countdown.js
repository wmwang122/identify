import React, { useState, useEffect } from "react";
import "./InGame.css";
import { get, post } from "../../../utilities.js";

// help from https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks

const Countdown = (props) => {
  const [timeLeft, setTimeLeft] = useState(props.time);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  const reset = () => {
    setIsActive(false);
    setTimeLeft(props.time);
  }

  useEffect(()=> {
    setTimeLeft(props.time);
  },[props.resetOnUpdate]);

  useEffect(() => {
    reset();
  },[props.time]);

  useEffect(()=> {
    if(props.isGameTimer){
      post("/api/gameTimerUpdate", {time: timeLeft, gameCode: props.gameCode});
    }
  },[timeLeft]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        props.updateTimeLeft(timeLeft-1);
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
    if (props.activate) {
      setIsActive(true);
    } else {
      reset();
    }
  }, [props.activate]);

  useEffect(() => {
    if(props.forceReset){
      reset();
    }
  }, [props.forceReset]);

  useEffect(()=>{
    if(props.activate){
      setIsActive(!props.paused);
    }
  }, [props.paused]);

  const buttonText = isActive ? "pause" : "start";
  //const button = props.visible?(<button onClick={toggle}>{buttonText}</button>):<></>;

  return (
    props.hide?(<></>):(<div>
      <div>{timeLeft}s</div>
    </div>)
  );
};

export default Countdown