const express = require('express');
const path = require('path');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '/public/')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/frontpage.html');
});

app.get('/createRoom', function (req, res) {
  res.sendFile(__dirname + '/public/createRoom.html')
});

io.once('connection', function (socket) {
  console.log("连接成功");
});

http.listen(3000, function () {
  console.log('listening on *3000');
});
