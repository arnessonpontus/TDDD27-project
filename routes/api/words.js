const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Word model
const Word = require("../../models/Word");

// @route  GET api/words
// @desc   Get all Words
// @access Public
router.get("/all", (req, res) => {
  Word.find()
    .sort({ date: -1 }) // -1: decending
    .then((words) => res.json(words));
});

router.get("/user", (req, res) => {
  Word.find({ _id: { $in: req.query.wordIds } })
    .sort({ date: -1 }) // -1: decending
    .then((words) => {
      res.json(words);
    });
});

// @route  POST api/words
// @desc   post a Word
// @access Private // Change to private after login
router.post("/", auth, (req, res) => {
  const newWord = new Word({
    name: req.body.name,
  });

  newWord.save().then((word) => res.json(word));
});

// @route  DELETE api/words:id
// @desc   delete an Word
// @access Private // Change to private after login
router.delete("/:id", auth, (req, res) => {
  Word.findById(req.params.id)
    .then((word) => word.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false })); // Sends 404 if word does not exist
});

module.exports = router;
