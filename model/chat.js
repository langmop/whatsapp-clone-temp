const mongoose = require("mongoose");

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
    type: Date,
    default: Date.now(),
  },
});

const ChatModel = mongoose.model("Chat", chatSchema);

module.exports = ChatModel;
