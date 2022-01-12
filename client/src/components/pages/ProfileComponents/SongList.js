import React, { Component } from "react";

const SongList = (props) => {
    return(<div>
        <h3>{props.name}</h3>
        <h3>{props.singer}</h3>
    </div>);
}; //TODO