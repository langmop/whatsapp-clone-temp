const socket = require("socket.io");
const UserModel = require("../../model/user");

module.exports = async (server) => {
  const io = socket(server);

  io.on("connection", async function (socket) {
    socket.on("acknowledge", async function (data) {
      try {
        const result = await UserModel.findOne({
          username: data.username,
        });

        result.session_id = data.session_id;

        const saveResult = await result.save();

        io.to(data.session_id).emit("acknowledge", {
          result: success,
        });
      } catch (err) {
        io.to(data.session_id).emit("acknowledge", {
          success: fail,
        });
      }
    });
  });
};
