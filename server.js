const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app); // For socketio
const io = socketio(server);

// Instead of body parser
app.use(express.json());

// Run when client connects
io.on("connection", (socket) => {
  const now = new Date();
  // Welcomes single user
  socket.emit("message", {
    text: "Welcome to the DOODLA",
    name: "Bot",
    time: now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
  });

  // Emits to all except the user
  socket.broadcast.emit("message", {
    text: "A user has joined the chat",
    name: "Bot",
    time: now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
  });

  socket.on("disconnect", () => {
    // Emits to everyone
    io.emit("message", {
      text: "A user has left the chat",
      name: "Bot",
      time: now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
    });
  });

  // Listen for chat message
  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });

  // Listen for drawing
  socket.on("drawing", (drawing) => {
    console.log(drawing);
    io.emit("drawing", drawing);
  });
});

// DB config
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

// Use Routes
app.use("/api/words", require("./routes/api/words"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));
