const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item model
const Item = require("../../models/Item");

// @route  GET api/items
// @desc   Get all Items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 }) // -1: decending
    .then((items) => res.json(items));
});

// @route  POST api/items
// @desc   post an Items
// @access Private // Change to private after login
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

// @route  DELETE api/items:id
// @desc   delete an Item
// @access Private // Change to private after login
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false })); // Sends 404 if item does not exist
});

module.exports = router;
