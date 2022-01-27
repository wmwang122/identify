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
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [pointsScored, setPointsScored] = useState(0);
  const [songsSaved, setSongsSaved] = useState(0);
  const [recentSongs, setRecentSongs] = useState([]);
  const [ownProfileId, setOwnProfileId] = useState(0);
  const [spotifyId, setSpotifyId] = useState(null);
  useEffect(() => {
    console.log("pfp: " + pfp);
  }, [pfp]);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      get("/api/whoami").then((user) => {
        setOwnProfileId(user.profileId);
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    get("/api/getProfile", { profileId: props.profileId }).then((user) => {
      setUserName(user.name);
      setBio(user.bio);
      setPfp(user.pfp ? user.pfp : "/logo.png");
      console.log(user.pfp);
      setGamesPlayed(user.gamesPlayed);
      setPointsScored(user.pointsScored);
      setSongsSaved(user.songsSaved);
      setRecentSongs(user.recentSongs);
      setSpotifyId(user.spotifyId);
    });
  }, []);

  const handlePfpChange = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function () {
      post("/api/pfpChange", { newPfp: reader.result, userId: props.userId }).then((res) => {
        setPfp(res.pfp);
        console.log(res);
      });
    };
    reader.onerror = function (error) {
      console.log("There was an error:" + error + "Please try again or use a different picture.");
    };
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
      {ownProfileId && ownProfileId.toString() === props.profileId ? (
        <div className="name-edit u-pointer" onClick={() => handleUsernameChange()}>
          ✎
        </div>
      ) : (
        <></>
      )}
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
      {ownProfileId && ownProfileId.toString() === props.profileId ? (
        <div className="editBio-button u-background-turquoise u-pointer" onClick={handleBioEdit}>
            Edit Bio
            
        </div>
      ) : (
        <></>
      )}
    </div>
  );

  let songDisplay = [];
  for (let i = recentSongs.length - 1; i >= 0; i--) {
    songDisplay.push(
      <div className="profile-songInfo-wrapper">
        <SongInfo song={recentSongs[i]} />
      </div>
    );
  }
  if (songDisplay.length === 0) {
    songDisplay.push(<div className="profile-no-songs-saved">No songs saved yet!</div>);
  }
  return (
    <div>
      <div className="profile-container-1">
        <div className="pfp-super-container">
          <div className="pfp-container u-background-turquoise">
            {" "}
            {ownProfileId && ownProfileId.toString() === props.profileId ? (
              <>
                <label for="pfpUpload">
                  <img src={pfp} className="rounded" onClick={handlePfpChange} />
                </label>
                <input
                  type="file"
                  name="file"
                  id="pfpUpload"
                  className="imageUpload"
                  accept="image/*"
                  onChange={handlePfpChange}
                />{" "}
              </>
            ) : (
              <img src={pfp} className="rounded-no-hover" />
            )}
          </div>
          <div className="spotify-text">
            <div className="follow-me-text"> Follow on Spotify: </div>

            <img
              src="/spotify.png"
              className="spotify-follow u-pointer"
              onClick={() => {
                location.href = "https://open.spotify.com/user/" + spotifyId;
              }}
            />
          </div>
        </div>
        <div className="bio-container">
          <div className="profile-title">{nameField}</div>
          {bioField}
        </div>
        <div className="spotify-and-text">
          <div className="stats-container">
            <div className="stats-title"> User Stats</div>

            <div className="profile-stat">
              <span>Games Played: </span> {gamesPlayed}
            </div>
            <div className="profile-stat">
              <span>Points Scored: </span> {pointsScored}
            </div>
            <div className="profile-stat">
              <span>Songs Saved: </span> {songsSaved}
            </div>
          </div>
        </div>
      </div>
      <div className="profile-lower-container">
        <div className="recentSongs-container">
          <div className="profile-recentSongs-text">Recently Saved Songs</div>
          <div className="profile-songList">{songDisplay}</div>
        </div>
      </div>
    </div>
  );
}; //TODO

export default Profile;
