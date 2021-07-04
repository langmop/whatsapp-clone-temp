const mongoose = require("mongoose");
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
const chatSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  chat: {
    type: String,
  },
  sendTime: {
    type: String,
    default: time,
  },
});

const ChatModel = mongoose.model("Chat", chatSchema);

module.exports = ChatModel;
