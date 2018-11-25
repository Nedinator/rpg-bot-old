const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  userID: String,
  username: String,
  serverID: String,
  class: {type: String, default: "None"},
  level: {type: Number, default: 1},
  wins: {type: Number, default: 0},
  losses: {type: Number, default: 0},
  traits: {type: [], default: []}
});

module.exports = mongoose.model("Profile", profileSchema)
