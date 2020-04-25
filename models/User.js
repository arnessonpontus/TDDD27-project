const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: String,
    required: true,
    default: Date.now(),
  },
  words: [String],
});

module.exports = User = mongoose.model("user", UserSchema);
