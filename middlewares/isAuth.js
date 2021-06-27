const jwtTokenDecoder = require("../config/jwt_config/jwt").decode;

module.exports = {
  loggedIn: (req, res, next) => {
    if (jwtTokenDecoder(req.cookies.user_info, process.env.JWT_KEY)) {
      res.redirect("/api/user");
    } else {
      return next();
    }
  },
  loggedOut: (req, res, next) => {
    if (jwtTokenDecoder(req.cookies.user_info, process.env.JWT_KEY) === null) {
      res.redirect("/");
    } else {
      return next();
    }
  },
};
