const express = require('express');
const path = require('path');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Mongo = require('mongodb').MongoClient;
var dataurl = "mongodb://47.99.223.94:3000/data";

app.use(express.static(path.join(__dirname, '/public/')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/frontpage.html');
});

app.get('/createRoom', function (req, res) {
  res.sendFile(__dirname + '/public/createRoom.html')
})

app.get('/joinGame', function (req, res) {
  res.sendFile(__dirname + '/public/joinGame.html')
})

app.get('/ready', function (req, res) {
  res.sendFile(__dirname + '/public/ready.html')
})

app.get('/game', function (req, res) {
  res.sendFile(__dirname + '/public/game.html')
})

io.sockets.on('connection', function (socket) {
  console.log("连接成功" + socket.id);//只有connection事件才会生成id
  socket.on('setRoomStart', function (setRoomSocket) {
    socket.emit('sendRoomID',socket.id);
    socket.on('setRoomEnd', function (data, roomSetSocket) {
      console.log("房间信息：" + data);
      //存储房间信息：数据库：id+设定+其他信息
      //退出房间
    });
  });
  socket.on('joinRoom', function (data) {
    //根据data返回
  });
  socket.on('gameReady', function (data) {

  });
  socket.on('gameStart', function () {
    socket.emit('changedStatus',initData/*数据库中读取的初始状态*/);

    socket.on('statusChange',function(globalStatusData){
      socket.broadcast.emit('globalChanged',globalStatusData);
    });

    socket.on('featureStart',function(){
      socket.emit('conutTime')
      socket.on('featureReq',function(fearureData){
        socket.broadcast.emit('featureInfo',fearureData);
      })
    })
  });
  socket.on('gameOver', function () {
    // overSocket.emit
  });
});

http.listen(3000, function () {
  console.log('listening on *3000');
});