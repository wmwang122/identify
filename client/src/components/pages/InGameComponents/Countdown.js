import React, { useState, useEffect } from "react";

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
    }
    if (timeLeft <= 0) {
      clearInterval(interval);
      setIsActive(false);
      props.end();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (props.userExists) {
      setIsActive(true);
    } else {
      reset();
      console.log("hi");
    }
  }, [props.userExists]);

  const buttonText = isActive ? "pause" : "start";

  return (
    <div>
      <div>{timeLeft}s</div>
      <button onClick={toggle}>{buttonText}</button>
    </div>
  );
};

export default Countdown;
