const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('send_message', (data)=>{4
    console.log("send_message client",data)
    io.emit('received_message', data)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const ip = '192.168.175.248'

server.listen(port,"192.168.175.248", () => {
  console.log(`server running at http://${ip}:${port}/`);
}); 

