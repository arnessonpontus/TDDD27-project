const express = require("express");
const router = express.Router();
const { doesContainRoom } = require("../../utils/game");

router.get("/enterRoom/:room", (req, res) => {
  const { room } = req.params;

  if (!doesContainRoom(room)) {
    res.status(200).send("ROOM_NOT_FOUND");
  } else {
    res.status(200).send("ROOM_FOUND");
  }
});

module.exports = router;
