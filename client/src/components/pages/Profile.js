import React, { Component, useEffect, useState } from "react";
import { Router } from "@reach/router";
import SongList from "./ProfileComponents/SongList.js"
import "../../utilities.css";
import "./Profile.css";
import {get, post} from "../../utilities.js";

const Profile = (props) => {
    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");
    const [value, setValue] = useState("");
    const [bioEditOn, toggleBioEdit] = useState(false);
    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            get("/api/whoami").then((user) => {
                setUserName(user.name);
                setBio(user.bio);
                console.log("set name and bio");
                console.log(JSON.stringify(user));
            });
        }
        return () => { isMounted = false };
    },[]);
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit({v: value});
        setBio(value);  
        setValue("");
        toggleBioEdit(!bioEditOn);
    };
    const handleBioEdit = (event) => {
        setValue(bio);
        toggleBioEdit(!bioEditOn);
    }
    const bioField = bioEditOn?(<div className="bio-subContainer"><textarea
        type="text"
        value={value}
        onChange={handleChange}
    />
    <div
        className="submitBioEdit-button u-background-turquoise u-pointer"
        onClick={handleSubmit}
    >Done</div></div>):
    (<div className="bio-subContainer">
        <div className="bio-Content">{bio}</div>
        <div className="editBio-button u-background-turquoise u-pointer"
            onClick={handleBioEdit}>
            Edit Bio</div></div>);
    return(
        <div>
            <div className="profile-container-1">
                <div className="pfp-container u-background-turquoise">
                    <img src="logo.png" height="250px"/>
                </div>
                <div className="bio-container">
                    <div className="profile-title">{userName}</div>
                    {bioField}
                </div>
            </div>
        </div>
    );
}; //TODO

export default Profile;