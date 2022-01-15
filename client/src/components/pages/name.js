import React, { Component, useEffect, useState } from "react";
import "../../utilities.css";
import "./Home.css";
import { Router } from "@reach/router";
import { get, post } from "../../utilities.js";

const Name = (props) => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      get("/api/whoami").then((user) => {
        setUserName(user.name);
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return <div>{userName}</div>;
};

export default Name;
