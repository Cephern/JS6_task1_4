const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 4000;

const app = express();

const server = app.listen(process.env.PORT || PORT, () => {
  console.log("listening to request on port 4000");
});

// Static files

app.use(express.static("public"));

// Socket setup

const io = socket(server);

io.on("connection", (socket) => {
  console.log(`made socket connection ${socket.id}`);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
    console.log(data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
