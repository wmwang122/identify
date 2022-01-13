import React, { Component } from "react";
import ProfilePic from "./ProfileComponents/ProfilePic.js"
import Biography from "./ProfileComponents/Biography.js"
import SongList from "./ProfileComponents/SongList.js"
import SpotifyLink from "./ProfileComponents/SpotifyLink.js"

const Profile = (props) => {
    return(
        <div>
            <ProfilePic props={props}/>
            <Biography props={props}/>
            <h1>Recently Added Songs</h1>
            {props.user.songs.map(song => (<SongList props={song._id}/>))}
            <SpotifyLink props={props}/>
        </div>
    );
}; //TODO