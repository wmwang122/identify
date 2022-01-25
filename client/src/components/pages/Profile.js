import React, { Component, useEffect, useState } from "react";
import { Router } from "@reach/router";
import "../../utilities.css";
import "./Profile.css";
import { get, post } from "../../utilities.js";
import SongInfo from "./InGameComponents/SongInfo.js";

const Profile = (props) => {
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [pfp, setPfp] = useState("logo.png");
  const [bioValue, setBioValue] = useState("");
  const [bioEditOn, toggleBioEdit] = useState(false);
  const [nameEditOn, setNameEditOn] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [gamesPlayed,setGamesPlayed] = useState(0);
  const [pointsScored,setPointsScored] = useState(0);
  const [songsSaved,setSongsSaved] = useState(0);
  const [recentSongs,setRecentSongs] = useState([]);
  const [ownProfileId, setOwnProfileId] = useState(0);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      get("/api/whoami").then((user) => {
        setOwnProfileId(user.profileId);
        console.log(JSON.stringify(user));
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    get("/api/getProfile",{profileId: props.profileId}).then((user) => {
        setUserName(user.name);
        setBio(user.bio);
        setPfp(user.pfp);
        setGamesPlayed(user.gamesPlayed);
        setPointsScored(user.pointsScored);
        setSongsSaved(user.songsSaved);
        setRecentSongs(user.recentSongs);
    });
  },[]);
  const handlePfpEdit = (event) => {
    const image_input = document.querySelector("#image_input");
    image_input.addEventListener("change", function () {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_image})`;
      });
      reader.readAsDataURL(this.files[0]);
    });
  };

  const handlePfpChange = (event) => {
    console.log("made it to handle");
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function () {
      console.log("made it to onload");
      post("/api/pfpChange", { newPfp: reader.result, userId: props.userId }).then((res) => {
        setPfp(res.newPfp);
        console.log("posted");
      });
    };
    reader.onerror = function (error) {
      console.log("There was an error:" + error + "Please try again or use a different picture.");
    };
  };

  const setPicture = (props) => {
    <img src={props.pfp} className="pfp" />;
  };

  const handleBioChange = (event) => {
    setBioValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({ v: bioValue });
    setBio(bioValue);
    setBioValue("");
    toggleBioEdit(!bioEditOn);
  };
  const handleBioEdit = (event) => {
    if (!nameEditOn) {
      setBioValue(bio);
      toggleBioEdit(!bioEditOn);
    }
  };

  const handleUsernameChange = (event) => {
    if (!bioEditOn) {
      setNameValue(userName);
      setNameEditOn(!nameEditOn);
    }
  };

  const handleNameValueChange = (event) => {
    setNameValue(event.target.value);
  };
  const handleNameChangeCancel = (event) => {
    setNameValue(userName);
    toggleBioEdit(false);
  };
  const handleNameValueSubmit = (event) => {
    if (event.which === 13) {
      setNameEditOn(false);
      setUserName(nameValue);
      post("/api/nameChange", { newName: nameValue, userId: props.userId }).then(() => {
        window.location.reload();
      });
    }
  };
  const nameField = nameEditOn ? (
    <div>
      <input
        type="text"
        value={nameValue}
        onChange={handleNameValueChange}
        onKeyPress={handleNameValueSubmit}
        onBlur={handleNameChangeCancel}
        className="inputNameValue"
      />
    </div>
  ) : (
    <>
      <div>{userName}</div>
      {ownProfileId && ownProfileId.toString()===props.profileId?(<div className="name-edit u-pointer" onClick={() => handleUsernameChange()}>
        ✎
      </div>):(<></>)}
    </>
  );
  const bioField = bioEditOn ? (
    <div className="bio-subContainer">
      <textarea type="text" value={bioValue} onChange={handleBioChange} />
      <div className="submitBioEdit-button u-background-turquoise u-pointer" onClick={handleSubmit}>
        Done
      </div>
    </div>
  ) : (
    <div className="bio-subContainer">
      <div className="bio-Content">{bio}</div>
      {ownProfileId && ownProfileId.toString()===props.profileId?(<div className="editBio-button u-background-turquoise u-pointer" onClick={handleBioEdit}>
        Edit Bio
      </div>):(<></>)}
    </div>
  );

  let songDisplay = [];
  for(let i = recentSongs.length-1; i >=0; i--){
      songDisplay.push(<div className="profile-songInfo-wrapper"><SongInfo song={recentSongs[i]} /></div>);
  }
  return (
    <div>
      <div className="profile-container-1">
        <div className="pfp-container u-background-turquoise">
          {/*added code starts*/}
          <input type="file" name="file" accept="image/*" onChange={handlePfpChange} />
          {/*           <input type="button" value="submit" onClick={setPicture}>
            submit
          </input> */}
          {/*added code ends*/}
          <img src={pfp} className="pfp" />
        </div>
        <div className="bio-container">
          <div className="profile-title">{nameField}</div>
          {bioField}
        </div>
      </div>
      <div className = "profile-lower-container">
      <div className = "stats-container">
          <div className = "profile-stats-text">
            User Statistics
          </div>
          <div className = "profile-stats">
              <div className = "profile-stat">
                <span className = "profile-stat-title">Games Played: </span> {gamesPlayed}
              </div>
              <div className = "profile-stat">
                <span className = "profile-stat-title">Points Scored: </span> {pointsScored}
              </div>
              <div className = "profile-stat">
                <span className = "profile-stat-title">Songs Saved: </span> {songsSaved}
              </div>
          </div>
      </div>
      <div>
          <div className = "profile-recentSongs-text">
              Recently Saved Songs
          </div>
          <div className = "profile-songList">
            {songDisplay}
          </div>
      </div>
    </div>
    </div>
  );
}; //TODO

export default Profile;
