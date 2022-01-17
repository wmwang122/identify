<html>
  <head>
    <title>Spotify Web Playback SDK Quick Start</title>
  </head>
  <body>
    <h1>Spotify Web Playback SDK Quick Start</h1>
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
        <script> {window.onSpotifyWebPlaybackSDKReady = () => {
            const token = 'BQBX-bRiokNzmDa8AlSuegI_1X85WMal8zlW-WE0qNMAzedP27kvokogHuCMsjFW-xDkZ1BTtZF1XB_vUVDNBK5No12w5aOCJjFYKYtvDDkbpQvfEdM85DLuycesvQfjzbHdb976zkrLwnZbvB8t_w5SHzGXNZJJKEbd6tXFMNk2WFF9-mQ62mo
';
            const player = new Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });
        } </script> 

  </body>
</html>
