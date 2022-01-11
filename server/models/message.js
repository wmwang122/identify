const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender_name: String,
  googleid: String,
  content: String,
});

module.exports = mongoose.model("message", MessageSchema);
