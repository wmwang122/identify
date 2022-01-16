import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import { get, post } from "../../../utilities.js";

const NewGame = () => {
    useEffect(() => {
        post("/api/NewGame", { code: "1234" });
    }, []);

    return (
        <div> new game created </div>
  )
};
//TODOOOOO
export default NewGame;
