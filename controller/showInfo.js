const jwtTokenDecoder = require("../config/jwt_config/jwt").decode;
module.exports = (req, res) => {
  const data = jwtTokenDecoder(req.cookies.user_info, process.env.JWT_KEY);
  res.render("user", {
    data: data,
  });
};
