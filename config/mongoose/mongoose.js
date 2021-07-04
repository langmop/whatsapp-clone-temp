const mongoose = require("mongoose");
require("dotenv").config();
uri = process.env.URI;
console.log(uri);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  // console.log("connected to database");
});

module.exports = mongoose;
