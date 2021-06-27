const jwtTokenDecoder = require("../config/jwt_config/jwt").decode;
const find = require("../storedProcedure/findByUsername");
module.exports = async (req, res) => {
  try {
    const contactResult = await find(req.body.contact);
    console.log(contactResult);
    if (contactResult == null) {
      return res.send({
        notFound: true,
      });
    }
    const data = jwtTokenDecoder(req.cookies.user_info, process.env.JWT_KEY);
    const user = data.username;
    const result = await find(user);
    var isPresent = false;
    for (x in result.contacts) {
      if (result.contacts[x] == req.body.contact) {
        isPresent = true;
        break;
      }
    }

    if (isPresent == false) {
      result.contacts.push(req.body.contact);
      const savedResult = await result.save();
      return res.send(contactResult);
    }

    res.send({
      alreadyAdded: true,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
