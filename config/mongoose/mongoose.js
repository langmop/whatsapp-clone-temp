const mongoose = require("mongoose");
require("dotenv").config();
uri = process.env.URI;
mongoose.connect(
  "mongodb+srv://langmop:1234@cluster0.ghnsr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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
