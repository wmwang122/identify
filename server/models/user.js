const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  spotifyid: String,
  bio: String,
  pfp: String,
  gamesplayed: Number,
  friends: [String],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
