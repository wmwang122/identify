import React, { Component } from "react";

const CreateGame = (props) => {
  return (
    <div>
      <h1>Code: </h1>
      <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />
    </div>
  );
};
