const app = require("./server");
const socket_config = require("./config/socket.io/socket");
PORT = 4000;
const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`listening on the port ${PORT}`);
});

socket_config(server);
