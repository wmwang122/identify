import React, { Component, useEffect, useState } from "react";
import { Router } from "@reach/router";
import SongList from "./ProfileComponents/SongList.js";
import "../../utilities.css";
import "./Profile.css";
import { get, post } from "../../utilities.js";

const Profile = (props) => {
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [pfp, setPfp] = useState("");
  const [bioValue, setBioValue] = useState("");
  const [bioEditOn, toggleBioEdit] = useState(false);
  const [nameEditOn, setNameEditOn] = useState(false);
  const [nameValue, setNameValue] = useState("");
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

  const imageHandler = (props) => {
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
  return (
    <div>
      <div className="profile-container-1">
        <div className="pfp-container u-background-turquoise">
          <img src="logo.png" className="pfp" />
          {/*added code starts*/}
          <input type="file" name="upload" accept="image/*" />
          <div id="display_image"></div>
          {imageHandler}
          {/*added code ends*/}
        </div>
        <div className="bio-container">
          <div className="profile-title">{nameField}</div>
          {bioField}
        </div>
      </div>
    </div>
  );
}; //TODO

export default Profile;
