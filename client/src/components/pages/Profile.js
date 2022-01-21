import React, { Component, useEffect, useState } from "react";
import { Router } from "@reach/router";
import SongList from "./ProfileComponents/SongList.js"
import "../../utilities.css";
import "./Profile.css";
import {get, post} from "../../utilities.js";

const Profile = (props) => {
    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");
    const [pfp, setPfp] = useState("");
    const [value, setValue] = useState("");
    const [bioEditOn, toggleBioEdit] = useState(false);
    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            get("/api/whoami").then((user) => {
                setUserName(user.name);
                setBio(user.bio);
                setPfp(user.pfp);
                console.log("set name and bio and pfp");
                console.log(JSON.stringify(user));
            });
        }
        return () => { isMounted = false };
    },[]);
    const handlePfpEdit = (event) => {
        const image_input = document.querySelector("#image_input");
        image_input.addEventListener("change", function() {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_image})`;
        });
        reader.readAsDataURL(this.files[0]);
        });

    }

    const imageHandler = (props) => {
        const image_input = document.querySelector("#image_input");
        image_input.addEventListener("change", function() {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_image})`;
        });
        reader.readAsDataURL(this.files[0]);
        });
    }
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
    };

    const handleUsernameChange = (event) => {
        console.log("todo");
    };
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
                    <img src="logo.png" className="pfp"/>
                    {/*added code starts*
                        <input type = "file" name = "upload" accept = "image/*"/>
                        <div id="display_image"></div>
                        {imageHandler}
                    {added code ends*/}
                </div>
                <div className="bio-container">
                    <div className="profile-title"><div>{userName}</div><div className="name-edit u-pointer" onClick={handleUsernameChange}>✎</div></div>
                    {bioField}
                </div>
            </div>
        </div>
    );
}; //TODO

export default Profile;