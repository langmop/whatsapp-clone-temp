const mongoose = require("mongoose");
require("dotenv").config();
uri = process.env.URI;
mongoose.connect(
  "",
  // enter your connect
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  // console.log("connected to database");
});

module.exports = mongoose;
