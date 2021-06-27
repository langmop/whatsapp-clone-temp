const UserModel = require("../model/user");

module.exports = async (data) => {
  const ModelData = new UserModel(data);
  const result = await ModelData.save();
  return result;
};
