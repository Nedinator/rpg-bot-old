const mongoose = require("mongoose");

const coinSchema = mongoose.Schema({
  userID: String,
  username: String,
  serverID: String,
  coins: Number
});

module.exports = mongoose.model("Coins", coinSchema)
