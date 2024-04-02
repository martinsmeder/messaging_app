const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.DATABASE_URL;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
