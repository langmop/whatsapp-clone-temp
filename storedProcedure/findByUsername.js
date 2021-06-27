const UserModel = require("../model/user");

module.exports = async (username) => {
  const result = await UserModel.findOne({
    username: username,
  });
  return result;
};
