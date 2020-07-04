const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const http = require("http");

const path = require("path");

const app = express();
const server = http.createServer(app); // For socketio

// Instead of body parser
app.use(express.json());

require("./socketServer").initSocket(server);

// ###### Database #######
// Get database uri from config
const db = config.get("mongoURI");

// Connect to DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ###### Routes #######
// Use Routes
app.use("/api/words", require("./routes/api/words"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static asset if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));
