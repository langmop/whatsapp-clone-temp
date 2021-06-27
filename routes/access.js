const express = require("express");
const Route = express.Router();
const getAccess = require("../controller/access");
const isLoggedIn = require("../middlewares/isAuth").loggedIn;
Route.get("/", isLoggedIn, getAccess);

module.exports = Route;
