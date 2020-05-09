const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userID: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = Word = mongoose.model("word", WordSchema);
