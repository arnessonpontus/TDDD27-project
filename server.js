const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to DB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
