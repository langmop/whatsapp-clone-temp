const jwtTokenDecoder = require("../config/jwt_config/jwt").decode;
const find = require("../storedProcedure/findByUsername");
module.exports = async (req, res) => {
  try {
    const contactResult = await find(req.body.contact);
    if (contactResult == null) {
      return res.status(404).send({
        notFound: true,
      });
    }
    const data = jwtTokenDecoder(req.cookies.user_info, "anything");
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
      return res.status(404).send(contactResult);
    }

    res.send({
      alreadyAdded: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
