const UserModel = require("../model/user");
module.exports = async function (req, res) {
  try {
    const result = await UserModel.findOne({
      username: req.body.username,
    });

    const contactArr = result.contacts;

    const contacts = await UserModel.find({
      username: { $in: contactArr },
    });

    res.send(contacts);
  } catch (err) {
    res.send([]);
  }
};
