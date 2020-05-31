const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const http = require("http");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");
const {
  addCurrentWord,
  removeCurrentWord,
  getCurrentWord,
} = require("./utils/game");
const path = require("path");

const app = express();
const server = http.createServer(app); // For socketio
const io = require("socket.io")(server);

// Instead of body parser
app.use(express.json());

// ###### Socket #######
// Run when client connects
io.on("connection", (socket) => {
  console.log("New socket connection");
  const now = new Date();

  socket.on("joinRoom", ({ name, email, room }) => {
    const user = userJoin(socket.id, name, email, room);

    socket.join(user.room);

    // Welcomes single user
    socket.emit("message", {
      text: "Welcome to DOODLA",
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

    // Check if the message is the correct guess to the word being drawn
    currWord = getCurrentWord(user.room);

    if (currWord && msg.text.toLowerCase() === currWord.word.toLowerCase()) {
      io.to(user.room).emit("message", {
        text: `The correct word was ${currWord.word}, congratulations ${msg.name}! Here is 20 extra points!`,
        name: "Bot",
        time: now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
      });

      io.to(user.room).emit("gameEnd", {
        user,
        drawingUser: currWord.drawer,
        word: currWord.word,
      }); // Pass name of winner

      removeCurrentWord(user.room);
    }
  });

  socket.on("userGameEnd", () => {
    const user = getCurrentUser(socket.id);
    currWord = getCurrentWord(user.room).word;

    if (user) io.to(user.room).emit("gameEnd", { user: null, word: currWord });
    removeCurrentWord(user.room);
  });

  socket.on("changeCategory", ({ category }) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("changeCategory", { category });
  });

  // Listen for game start
  socket.on("gameStart", ({ currentWord, name, email }) => {
    const currentDrawer = { name, email };
    const user = getCurrentUser(socket.id);
    if (!user) return; // Log out bug?

    addCurrentWord(currentWord, currentDrawer, user.room);

    // Send name of current drawer to everyone in room
    io.to(user.room).emit("gameStart", { currentDrawer, currentWord });

    socket.emit("AllowDraw");
    io.to(user.room).emit("drawing", { shouldClear: true });

    // Game timer
    let countDownTime = 60;
    const countdown = setInterval(function () {
      countDownTime--;

      const currentWord = getCurrentWord(user.room);
      // End drawing session
      if (countDownTime < 1 || !currentWord) {
        // Ended by time
        if (currentWord) {
          io.to(user.room).emit("gameEnd", {
            user: null,
            word: currentWord.word,
          }); // No winner
          removeCurrentWord(user.room);
        }

        clearInterval(countdown);
      } else {
        // Send visual update every second
        io.to(user.room).emit("secondChange", {
          countDownTime,
        });
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
