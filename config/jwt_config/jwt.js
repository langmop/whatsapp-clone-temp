const jwt = require("jsonwebtoken");

module.exports = {
  code: (data, key) => {
    return jwt.sign(data, key);
  },
  decode: (token, key) => {
    try {
      return jwt.verify(token, key, function (err, decode) {
        if (err) return null;
        return decode;
      });
    } catch (err) {
      res.send(err);
    }
  },
};
