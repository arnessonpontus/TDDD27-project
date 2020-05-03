const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const http = require("http");
const socketio = require("socket.io");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");
const path = require("path");

const app = express();
const server = http.createServer(app); // For socketio
const io = socketio(server);

// Instead of body parser
app.use(express.json());

// Run when client connects
io.on("connection", (socket) => {
  const now = new Date();

  socket.on("joinRoom", ({ name, room }) => {
    const user = userJoin(socket.id, name, room);

    socket.join(user.room);

    // Welcomes single user
    socket.emit("message", {
      text: "Welcome to the DOODLA",
      name: "Bot",
      time: now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
    });

    // Emits to all except the user
    socket.broadcast.to(user.room).emit("message", {
      text: `${user.name} has joined the chat`,
      name: "Bot",
      time: now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
    });

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chat message
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    if (user) io.to(user.room).emit("message", msg);
  });

  // Listen for game start
  socket.on("gameStart", () => {
    const user = getCurrentUser(socket.id);
    if (!user) return; // Log out bug?

    io.to(user.room).emit("drawing", { shouldClear: true });
    socket.broadcast.to(user.room).emit("disableDraw");

    // Game timer
    let countDownTime = 10;
    const countdown = setInterval(function () {
      countDownTime--;

      // Send visual update every second
      io.to(user.room).emit("secondChange", {
        countDownTime,
      });

      // End drawing session
      if (countDownTime < 1) {
        socket.broadcast.to(user.room).emit("AllowDraw");
        clearInterval(countdown);
      }
    }, 1000);
  });

  // Listen for drawing
  socket.on("drawing", (drawing) => {
    user = getCurrentUser(socket.id);
    if (user) io.to(user.room).emit("drawing", drawing);
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      // Emits to everyone
      io.to(user.room).emit("message", {
        text: `${user.name} has left the chat`,
        name: "Bot",
        time: now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
      });

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
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
