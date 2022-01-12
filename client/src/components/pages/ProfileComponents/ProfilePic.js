import React, { Component } from "react";

const ProfilePic = (props) => {
    return(<div>
        <h1>This is an Image of Profile Pic!!1!</h1>
        <img>{props.user.pfp}</img>
    </div>);
}; //TODO