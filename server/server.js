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

  // setTimeout(() => {
  //   // socket.send('This event triggered from server side')

  //   let obj = {
  //     channel_name: 'My Channel',
  //     subsribers: '2k+',
  //     message: 'Please like this video and subscribe my channel',
  //   }

  //   socket.emit('customEvent', {data: obj})
  // }, 4000);


  socket.on('clientEvent', (data)=>{
    console.log('client data received', data)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${3000}/`);
}); 