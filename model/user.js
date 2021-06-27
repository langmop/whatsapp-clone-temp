const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },

  activeAt: { type: Date, default: Date.now },
  contacts: {
    type: [String],
    default: [],
  },
  image_src: {
    type: String,
    default:
      "/media/langmop/1027146F1027146F/whatsapp-clone/public/images/user.png",
  },
  session_id: {
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
