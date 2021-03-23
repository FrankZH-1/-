(function (doc, win) {
  var doc1 = doc.documentElement,
    spinEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = doc1.clientWidth;
      if (!clientWidth) return;
      doc1.style.fontSize = 20 * (clientWidth / 320) + 'px';
    };

  if (!doc.addEventListener) return;
  win.addEventListener(spinEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

window.onload = function(){
  var app = require('express')(),
  http = require("http").Server(app),
  socket = io(),
  optionButtons = document.querySelectorAll(".chooseOption"),
  confirmButton = document.querySelectorAll(".confirmButton");
  var sendChoose = function(element){
    socket.emit("vote commit",'')
  }
  Array.prototype.forEach.call(optionButtons,(item)=>{
    item.addEventListener('touchend',sendChoose(item));
  })
  (function (){

  })();
}