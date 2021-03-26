const express = require('express');
const path = require('path');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Mongo = require('mongodb').MongoClient;
var dataurl = "mongodb://47.99.223.94:3000/data";


console.log(require('socket.io').version);

app.use(express.static(path.join(__dirname, '/public/')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/frontpage.html');
});

app.get('/createRoom', function (req, res) {
  res.sendFile(__dirname + '/public/createRoom.html')
})

io.on('connection', function (socket) {
  console.log("连接成功");
  socket.on('setRoomStart',function(setRoomSocket){
    console.log("房主："+setRoomSocket.id);
    socket.on('setRoomEnd',function(data,roomSetSocket){
    console.log("房间信息："+roomSetSocket.id+data);
    });
  });
  socket.on('joinRoom',function(data,joinSocket){

  });
  socket.on('gameReady',function(data,readySocket){

  });
  socket.on('gameStart',function(gameSocket){

  });
  socket.on('gameOver',function(overSocket){

  });
});

http.listen(3000, function () {
  console.log('listening on *3000');
});