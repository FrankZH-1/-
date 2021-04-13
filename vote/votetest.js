var app = require('express')();
var server = require('http').Server(app);
const path = require('path');

app.use(express.static(path.join(__dirname,'/vote/')));

app.get('/',function(req,res){
  res.send(path.)
})