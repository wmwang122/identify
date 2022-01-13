import React, { Component, useEffect, useState } from "react";
import { Router } from "@reach/router";
import ProfilePic from "./ProfileComponents/ProfilePic.js"
import Biography from "./ProfileComponents/Biography.js"
import SongList from "./ProfileComponents/SongList.js"
import SpotifyLink from "./ProfileComponents/SpotifyLink.js"
import "../../utilities.css";
import "./Profile.css";
import {get, post} from "../../utilities.js";

const Profile = (props) => {
    const [userName, setUserName] = useState("Undefined");
    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            get("/api/whoami").then((user) => {
                setUserName(user.name);
            });
        }
        return () => { isMounted = false };
    },[]);
    return(
        <div>
            <div className="profile-container-1">
                <div className="pfp-container u-background-turquoise">
                    <img src="logo.png" height="250px"/>
                </div>
                <div className="bio-container">
                    <div className="profile-title">{userName}</div>
                    <div>This is some placeholder bio text</div>
                </div>
            </div>
            {/*<ProfilePic props={props}/>
            <Biography props={props}/>
            <h1>Recently Added Songs</h1>
            {props.user.songs.map(song => (<SongList props={song._id}/>))}
            <SpotifyLink props={props}/>*/}
        </div>
    );
}; //TODO

export default Profile;