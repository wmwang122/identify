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

const SpotifyWebApi = require('spotify-web-api-node');


//initialize socket
const socketManager = require("./server-socket");

const spotifyApi = new SpotifyWebApi({
  clientId: 'b84e6bd6a87c4f93928c36e67f599187',
  clientSecret: '8a3349b63932454bb357f04367474560',
  redirectUri: 'http://localhost:5000/api/callback',
});

router.get('/spotifyLogin', (req, res) => {
  auth.spotifyLogin(req, res, spotifyApi);
})

router.get('/callback', async (req, res) => {
  auth.callback(req, res, spotifyApi);
});

router.get('/playlists', async (req, res) => {
  try {
    const loggedInSpotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_API_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.CALLBACK_URI,
    });
    loggedInSpotifyApi.setRefreshToken(req.user.refreshToken);
    loggedInSpotifyApi.refreshAccessToken().then(async (data) => {
      console.log("Access Token Refreshed!");
      loggedInSpotifyApi.setAccessToken(data.body['access_token']);
      const result = await loggedInSpotifyApi.getUserPlaylists();
      res.status(200).send(result.body);
    })
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/getMe', (req, res) => {
  const loggedInSpotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_API_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.CALLBACK_URI,
  });
  loggedInSpotifyApi.setRefreshToken(req.user.refreshToken);
  loggedInSpotifyApi.refreshAccessToken().then((data) => {
    loggedInSpotifyApi.setAccessToken(data.body['access_token']);
    loggedInSpotifyApi.getMe()
      .then(function (data) {
        console.log('Some information about the authenticated user', data.body);
        res.send(data)
      }, function (err) {
        console.log('Something went wrong!', err);
      });
  });
})

router.post("/logout", auth.logout);

router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  User.findOne({_id: req.user._id}).then((user) => {
    req.user = user;
    res.send(req.user);
  });
});


router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.post("/bioUpdate",(req,res) => {
  if(req.body.id){
    User.findOne({_id: req.body.id}).then((user) => {
      user.bio = req.body.content;
      user.save().then((value) => {
        console.log(value.bio);
      });
    });
  }
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
});
router.get("/userLookup",(req,res) => {
  User.findOne({_id: req.query._id}).then((user) => {
    res.send(user);
  });
});

router.post("/buzz",(req,res) => {
  console.log("hello");
  socketManager.getIo().emit("buzz", req.body.userId);
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
  const game = new GameSchema({
    gameCode: req.body.code,
  });
  game.save();
});

/*router.get("/getGame",(req,res) =>{
  GameSchema.findOne({gameCode: req.query.code}).then((game)=>{
    if(game && game.currentBuzz)
      res.send(game.currentBuzz); //temp
  });
});*/

router.get("/getGame", (req, res) => {
  GameSchema.findOne({ gameCode: req.query.gameCode }).then((game) => {
    if (game != null) {
      res.send({status: "Game found"})
    } else {
      res.send({status: "No game"})
    }
  });
});

router.post("/gameUpdateBuzz",(req,res) => {
  console.log("Received:" + JSON.stringify(req.body));
  GameSchema.findOne({gameCode: req.body.code}).then((game)=>{
    if(game){
      game.currentBuzz = req.body.buzz;
      game.save();
    }
  });
});
  
  
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
