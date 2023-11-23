const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors')

const app = express();
app.use(cors({origin: 'http://localhost:3000'})) //whitelisting the 3000 port
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: 'http://localhost:3000' });

io.on("connection", (socket) => {
  // ...
  console.log("Server connected")

  socket.on('beginPath', (arg) => {
    socket.broadcast.emit('beginPath', arg)//to emit the event to other servers other than the one which is emiting it i.e., moving the mouse to draw something on the canvas board
  })

  socket.on('drawLine', (arg) => {
    socket.broadcast.emit('drawLine', arg)
  })

  socket.on('changeConfig', (arg) => {
    socket.broadcast.emit('changeConfig', arg)
  })
});

httpServer.listen(3500);