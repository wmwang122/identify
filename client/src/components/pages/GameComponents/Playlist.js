import React, { useEffect, useState } from "react";

const Playlist = (props) => 
{
    return(
    <form>
    <label for="url">Enter your Spotify Playlist URL:</label>

    <input type="url" name="url" id="url"
        placeholder="https://open.spotify.com/playlist/"
        pattern="https://open.spotify.com/playlist/.*" size="75"
        required></input>
    </form>);
}

export default Playlist;