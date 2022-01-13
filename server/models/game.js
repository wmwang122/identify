const mongoose = require("mongoose");
const Settings = new mongoose.Schema({
    stuff: String, //todo, idk how to make this work
});
const GameSchema = new mongoose.Schema({
  creator_name: String,
  settings: String, //probably needs the Settings subschema
  songList: Array[String],
  currentSong: Number,
  timeStamp: Number,
  participants: Array[String],
});

module.exports = mongoose.model("game", GameSchema);
