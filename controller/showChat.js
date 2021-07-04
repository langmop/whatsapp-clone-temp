const chatModel = require("../model/chat");
module.exports = async (req, res) => {
  try {
    const chats = await chatModel
      .find({
        $or: [
          { sender: req.body.sender, receiver: req.body.receiver },
          { sender: req.body.receiver, receiver: req.body.sender },
        ],
      })
      .sort("sendTime");

    if (chats.length == 0) {
      return res.status(404).send("no chat");
    }
    return res.send(chats);
  } catch (err) {
    return res.status(404).send("no chat");
  }
};
