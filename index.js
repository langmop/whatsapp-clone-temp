const express = require("express");
const mongoose = require("./config/mongoose/mongoose");
require("dotenv").config();
var cookieParser = require("cookie-parser");
const app = express();
const user = require("./routes/user");
const socket_config = require("./config/socket.io/socket");
const acknowledge = require("./config/socket.io/acknowledge");
const hostname = "0.0.0.0";
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
access = require("./routes/access");
app.set("view engine", "ejs");
PORT = 4000;

app.use("/", access);
app.use("/api/user", user);

const server = app.listen(PORT, hostname, (err) => {
  if (err) console.log(err);
  console.log(`listening on the port ${PORT}`);
});

socket_config(server);
