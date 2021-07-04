const UserModel = require("../model/user");
module.exports = async function (req, res) {
  console.log(req.body.username);
  try {
    const result = await UserModel.findOne({
      username: req.body.username,
    });

    console.log(result, req.body.username, "here");
    if (result == null) {
      return res.status(404).send("NO USER FIND ");
    }
    const contactArr = result.contacts;

    const contacts = await UserModel.find({
      username: { $in: contactArr },
    });

    res.send(contacts);
  } catch (err) {
    console.log(err);
    res.status(404).send([]);
  }
};
