const jwtTokenDecoder = require("../config/jwt_config/jwt").decode;

module.exports = {
  loggedIn: (req, res, next) => {
    if (jwtTokenDecoder(req.cookies.user_info, "anything")) {
      res.redirect("/api/user");
    } else {
      return next();
    }
  },
  loggedOut: (req, res, next) => {
    if (jwtTokenDecoder(req.cookies.user_info, "anything") === null) {
      console.log(req.cookies.user_info);
      res.redirect("/");
    } else {
      return next();
    }
  },
};
