import React, { Component } from "react";
import "./Skeleton.css";

const Profile = ({props}) => {
    return(
        <div>
            <ProfilePic/>
            <Biography/>
            <h1>Recently Added Songs</h1>
            {props.user.songs.map(song => (<SongList song={song._id}/>))}
            <SpotifyLink/>
        </div>
    );
};