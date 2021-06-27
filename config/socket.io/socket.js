const socket = require("socket.io");
var otpGenerator = require("otp-generator");
var nodemailer = require("nodemailer");
const UserModel = require("../../model/user");

const ChatModel = require("../../model/chat");

module.exports = function (server) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mishragaurav656@gmail.com",
      pass: process.env.PASS,
    },
  });
  const io = socket(server);
  io.on("connection", function (socket) {
    socket.on("verify", function (data) {
      console.log(data);
      const otp = otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
      });
      var mailOptions = {
        from: "mishragaurav656@gmail.com",
        to: data.handle,
        subject: "Whatsapp Demo OTP",
        text: `Your One Time Password for Whatsapp demo is 
        
          otp : ${otp}
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      console.log(otp);
      io.to(socket.id).emit("verify", {
        handle: data.handle,
        otp: otp,
      });
    });
    socket.on("acknowledge", async function (data) {
      try {
        const result = await UserModel.findOne({
          username: data.username,
        });

        result.session_id = socket.id;

        const saveResult = await result.save();

        io.to(socket.id).emit("acknowledge", {
          result: "success",
        });
      } catch (err) {
        console.log(err);
        io.to(data.session_id).emit("acknowledge", {
          success: "fail",
        });
      }
    });

    socket.on("chat", async function (data) {
      console.log(data);

      const result = new ChatModel(data);
      const savedResult = await result.save();
      const senderData = await UserModel.findOne({
        username: data.sender,
      });
      data.sender_session_id = senderData.session_id;
      io.to(senderData.session_id).emit("chat", data);

      const receiverData = await UserModel.findOne({
        username: data.receiver,
      });

      io.to(receiverData.session_id).emit("chat", data);
    });
  });
};
