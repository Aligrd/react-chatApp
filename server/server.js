const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3003",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected :${socket.id}`);

  socket.on("join_room", (joinData) => {
    console.log(
      `=====>user ${joinData.user} joined room ${joinData.roomId} <=====`
    );
    const room = Number(joinData.roomId);
    socket.join(room);
  });

  socket.on("send_message", (msg) => {
    console.log(msg);
    socket.to(Number(msg.roomId)).emit("recieve_msg", msg);
    console.log("user send a message");
  });

  //   socket.emit("recieve_msg", {
  //     message: "message from socket server",
  //     author: "socket",
  //     date: new Date(Date.now()),
  //   });

  socket.on("disconnect", () => {
    console.log(`user disconnected :${socket.id}`);
  });
});

server.listen(3003, () => {
  console.log("server is listning");
});
