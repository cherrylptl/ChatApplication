// User for Chat Application

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const messages = []

io.on('connection', (socket) => {
  const username = socket.handshake.query.username
  socket.on('message', (data) => {
    const message = {
      message: data.message,
      senderUsername: username,
      sentAt: Date.now(),
      type: data.type // Provide Message Type(text,img,audio,...)
    }
    messages.push(message)
    io.emit('message', message)
  })
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});
