const jwtTokenGenerator = require("../config/jwt_config/jwt").code;
const save = require("../storedProcedure/save");
const find = require("../storedProcedure/findByUsername");
const UserModel = require("../model/user");
module.exports = async (req, res) => {
  console.log(req.body);
  var saveUser;
  try {
    const result = await find(req.body.username);
    if (result == null) {
      saveUser = await save(req.body);
    } else {
      result.name = req.body.name;
      result.image_src = req.body.image_src;
      saveUser = await result.save();
    }
    console.log(saveUser);
    const token = jwtTokenGenerator(req.body, process.env.JWT_KEY);
    res.cookie("user_info", token);
    res.send("received").status(200);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};
