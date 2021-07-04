const express = require("express");
const mongoose = require("./config/mongoose/mongoose");
require("dotenv").config();
var cookieParser = require("cookie-parser");
const app = express();
app.set("view engine", "ejs");
const user = require("./routes/user");
const acknowledge = require("./config/socket.io/acknowledge");
require("dotenv").config();
const hostname = "0.0.0.0";
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
access = require("./routes/access");

app.use("/", access);
app.use("/api/user", user);
module.exports = app;
