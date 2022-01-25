const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  spotifyId: String,
  refreshToken: String,
  bio: String,
  pfp: String,
  gamesPlayed: Number,
  pointsScored: Number,
  songsSaved: Number,
  profileId: Number,
  recentSongs: [Object],
  friends: [String],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
