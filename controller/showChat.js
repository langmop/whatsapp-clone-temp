const chatModel = require("../model/chat");
module.exports = async (req, res) => {
  const chats = await chatModel
    .find({
      $or: [
        { sender: req.body.sender, receiver: req.body.receiver },
        { sender: req.body.receiver, receiver: req.body.sender },
      ],
    })
    .sort("sendTime");

  res.send(chats);
};
