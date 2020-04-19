const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

// Instead of body parser
app.use(express.json());

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

app.listen(port, () => console.log(`Server running on port ${port}`));
