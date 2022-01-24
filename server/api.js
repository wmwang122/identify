/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const GameSchema = require("./models/game");

// import authentication library
const auth = require("./auth");
// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

const SpotifyWebApi = require("spotify-web-api-node");

//initialize socket
const socketManager = require("./server-socket");
const game = require("./models/game");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_API_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URI,
});

const games = new Map();

const generateCode = (length) => {
  var code = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

router.get("/spotifyLogin", (req, res) => {
  auth.spotifyLogin(req, res, spotifyApi);
});

router.get("/callback", async (req, res) => {
  auth.callback(req, res, spotifyApi);
});

router.get("/playlists", async (req, res) => {
  try {
    const loggedInSpotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_API_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.CALLBACK_URI,
    });
    loggedInSpotifyApi.setRefreshToken(req.user.refreshToken);
    loggedInSpotifyApi.refreshAccessToken().then(async (data) => {
      console.log("Access Token Refreshed!");
      loggedInSpotifyApi.setAccessToken(data.body["access_token"]);
      const result = await loggedInSpotifyApi.getUserPlaylists();
      res.status(200).send(result.body);
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/testPlaylists", async (req, res) => {
  try {
    const loggedInSpotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_API_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.CALLBACK_URI,
    });

    loggedInSpotifyApi.setRefreshToken(req.user.refreshToken);
    loggedInSpotifyApi.refreshAccessToken().then(async (data) => {
      console.log("Access Token Refreshed!");
      loggedInSpotifyApi.setAccessToken(data.body["access_token"]);
      const result = await loggedInSpotifyApi.getPlaylist("298KKeccSUTyyehrAJzZ9r");
      console.log(result.body.tracks.items);
      // const result = await loggedInSpotifyApi.getAlbum("3oVCGd8gjANVb5r2F0M8BI");
      // console.log(result.body.tracks.items);
      // res.status(200).send(result.body);
     // res.status(200).send(result.body.tracks.items);
     let trackList = [];
     for (let i=0; i<result.body.tracks.items.length; i++) {
       trackList.push(result.body.tracks.items[i].track);
     };
     res.status(200).send(trackList);
     //res.status(200).send([]);
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/getMe", (req, res) => {
  const loggedInSpotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_API_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.CALLBACK_URI,
  });
  loggedInSpotifyApi.setRefreshToken(req.user.refreshToken);
  loggedInSpotifyApi.refreshAccessToken().then((data) => {
    loggedInSpotifyApi.setAccessToken(data.body["access_token"]);
    loggedInSpotifyApi.getMe().then(
      function (data) {
        console.log("Some information about the authenticated user", data.body);
        res.send(data);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  });
});

router.post("/logout", auth.logout);

router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  User.findOne({ _id: req.user._id }).then((user) => {
    req.user = user;
    res.send(req.user);
  });
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.post("/bioUpdate", (req, res) => {
  if (req.body.id) {
    User.findOne({ _id: req.body.id }).then((user) => {
      user.bio = req.body.content;
      user.save().then((value) => {
        console.log(value.bio);
      });
    });
  }
  res.send({});
});

router.post("/nameChange", (req,res) =>{
  if(req.body.userId){
    User.findOne({_id: req.body.userId}).then((user)=>{
      user.name = req.body.newName;
      user.save().then((value)=>{
        console.log(value.name);
      });
    });
  }
  res.send({});
});

router.post("/pfpUpdate", (req, res) => {
  if (req.body.id) {
    User.findOne({ _id: req.body.id }).then((user) => {
      user.pfp = req.body.content;
      user.save().then((value) => {
        console.log(value.pfp);
      });
    });
  }
  res.send();
});
router.get("/userLookup", (req, res) => {
  User.findOne({ _id: req.query._id }).then((user) => {
    res.send(user);
  });
});

router.get("/getGameData", (req, res) => {
  ans = games.get(req.query.code);
  if (ans) {
    res.send(ans);
  } else {
    res.send({});
  }
});

router.post("/buzz", (req, res) => {
  let game = games.get(req.body.gameCode);
  let flag = true;
  for (let i = 0; i < game.userData.length; i++) {
    if (game.userData[i]._id === req.body.userId) {
      console.log(game.userData[i]);
      flag = false;
      game.userBuzz = game.userData[i];
      console.log(JSON.stringify(game.userData));
      let newMessage = {
        content: game.userData[i].name + " has buzzed!",
        roundNum: req.body.roundNum,
      };
      game.gameLog.push(newMessage);
      socketManager.getIo().to(req.body.gameCode).emit("new log", newMessage);
      console.log(game.gameLog);
    }
  }
  if (flag) {
    console.log("an error has occurred");
  }
  socketManager.getIo().to(req.body.gameCode).emit("buzz", req.body.userId);
  res.send({});
});

router.post("/clearBuzz", (req, res) => {
  let game = games.get(req.body.gameCode);
  game.userBuzz = null;
  console.log("cleared buzz");
  res.send({});
});

router.post("/submitted", (req, res) => {
  let game = games.get(req.body.gameCode);
  if (req.body.sub) {
    for (let i = 0; i < game.userData.length; i++) {
      if (game.userData[i]._id === req.body.user._id) {
        game.userData[i].score++;
        break;
      }
    }
    game.roundOngoing = false;
  }
  let newMessage = {
    content: req.body.value + " was " + (req.body.sub ? "correct." : "incorrect."),
    roundNum: req.body.roundNum,
  };
  game.gameLog.push(newMessage);
  socketManager.getIo().to(req.body.gameCode).emit("new log", newMessage);
  socketManager.getIo().to(req.body.gameCode).emit("submitted", { submission: req.body.sub, name: req.body.user.name });
  res.send({});
});

router.post("/roundStart", (req, res) => {
  let game = games.get(req.body.gameCode);
  game.roundOngoing = true;
  socketManager.getIo().to(req.body.gameCode).emit("starting", {});
  res.send({});
});

/*router.post("/gameInitiate",(req,res) =>{
  GameSchema.countDocuments({gameCode: req.body.code}, function (err,count){
    if(count===0){
      const game = new GameSchema({
        currentBuzz: "",
        gameCode: req.body.code,
      });
      game.save();
    }
  });
});*/

router.post("/newGame", (req, res) => {
  let code = generateCode(5);
  while (games.get(code)) {
    code = generateCode(5);
  }
  games.set(code, {
    settings: req.body.settings,
    userData: [{ _id: req.body.userId, name: req.body.name, score: 0 }],
    userBuzz: null,
    gameChat: [],
    gameLog: [],
    hostName: req.body.hostName, //I JUST ADDED
    //trackList: req.body.settings.trackList, add once settings can add playlists
    trackNum: 0,
    trackList: [],
    endingMessage: "",
    songTimeLeft: 30,
    roundOngoing: false,
  }); //maps gamecode to an array of game settings
  socketManager.addUserToGame(req.body.userId, code);
  //socketManager.getIo().to(code).emit("new player", req.body.userId);
  res.send({ gameCode: code });
  // const game = new GameSchema({
  //   gameCode: code,
  // });
  // game.save();
});

router.post("/joinGame", (req, res) => {
  if (games.get(req.body.gameCode)) {
    let game = games.get(req.body.gameCode);
    socketManager.addUserToGame(req.body.userId, req.body.gameCode);
    let flag = true;
    for (let i = 0; i < game.userData.length; i++) {
      if (game.userData[i]._id === req.body.userId) {
        flag = false;
        break;
      }
    }
    if (flag) {
      game.userData.push({ _id: req.body.userId, name: req.body.name, score: 0 });
      socketManager.getIo().to(req.body.gameCode).emit("new player", req.body.userId);
    }
    res.send({
      status: "game found" + flag ? "" : ", user is already in game",
      gameCode: req.body.gameCode,
      settings: game.settings,
    });
  } else {
    res.send({ status: "game not found" });
  }
});

router.post("/chatSubmit", (req, res) => {
  let game = games.get(req.body.gameCode);
  let message = {
    _id: req.body.userId,
    name: req.body.name,
    content: req.body.content,
  };
  game.gameChat.push(message);
  socketManager.getIo().to(req.body.gameCode).emit("new message", message);
  res.send({});
});

router.post("/increaseTrackNum", (req, res) => {
  let game = games.get(req.body.gameCode);
  game.trackNum++;
  res.send({});
});

router.post("/songEnded", (req, res) => {
  let game = games.get(req.body.gameCode);
  game.roundOngoing = false;
  game.trackNum++;
  newMessage = {
    content: "Time is up! The answer was: " + JSON.stringify(req.body.song.name),
    roundNum: req.body.roundNum,
  };
  game.gameLog.push(newMessage);
  socketManager.getIo().to(req.body.gameCode).emit("new log", newMessage);
  res.send({});
});

router.post("/gameTimerUpdate", (req, res) => {
  let game = games.get(req.body.gameCode);
  game.songTimeLeft = req.body.time;
  res.send({});
});

router.get("/searchSpotify", (req,res) =>{
  const loggedInSpotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_API_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.CALLBACK_URI,
  });
  loggedInSpotifyApi.setRefreshToken(req.user.refreshToken);
  loggedInSpotifyApi.refreshAccessToken().then((data) => {
    loggedInSpotifyApi.setAccessToken(data.body["access_token"]);
    console.log("Query received: " + req.query.query);
    loggedInSpotifyApi.searchTracks("track:"+req.query.query).then((data) =>{
      ans = [];
      for(let i = 0; i < data.body.tracks.items.length; i++){
        if(ans.length >= 5){
          break;
        }
        if(data.body.tracks.items[i].preview_url){
          ans.push(data.body.tracks.items[i]);
        }
      }
      res.send(ans);
    });
  });
});

router.post("/addSong",(req,res) =>{
  let game = games.get(req.body.gameCode);
  game.trackList.push(req.body.song);
  socketManager.getIo().to(req.body.gameCode).emit("added song", req.body.song);
  res.send({});
});

router.post("/testPlaylistsInitialize", (req,res) => {
  let game = games.get(req.body.gameCode);
  game.trackList = req.body.data;
  res.send({});
});

router.post("/updateSongTimeLeft", (req,res) =>{
  let game = games.get(req.body.gameCode);
  game.songTimeLeft = req.body.songTimeLeft;
  res.send({});
});

router.post("/setEndingMessage", (req,res) =>{
  let game = games.get(req.body.gameCode);
  game.endingMessage = req.body.message;
  res.send({});
})

/*router.get("/getGame",(req,res) =>{
  GameSchema.findOne({gameCode: req.query.code}).then((game)=>{
    if(game && game.currentBuzz)
      res.send(game.currentBuzz); //temp
  });
});*/

// router.get("/getGame", (req, res) => {
//   GameSchema.findOne({ gameCode: req.query.gameCode }).then((game) => {
//     if (game != null) {
//       res.send({ status: "Game found" });
//     } else {
//       res.send({ status: "No game" });
//     }
//   });
// });

/*router.post("/gameUpdateBuzz", (req, res) => {
  console.log("Received:" + JSON.stringify(req.body));
  GameSchema.findOne({ gameCode: req.body.code }).then((game) => {
    if (game) {
      game.currentBuzz = req.body.buzz;
      game.save();
    }
  });
});*/

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
