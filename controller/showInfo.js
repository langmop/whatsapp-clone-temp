const jwtTokenDecoder = require("../config/jwt_config/jwt").decode;
module.exports = (req, res) => {
  const data = jwtTokenDecoder(req.cookies.user_info, "anything");
  res.render("user", {
    data: data,
  });
};
