(function(doc,win){
  var doc1 = doc.documentElement,
  spinEvt = 'orientationchange' in window ? 'orientationchange':'resize',
  recalc = function(){
    var clientWidth = doc1.clientWidth;
    if (!clientWidth) return;
    doc1.style.fontSize = 20*(clientWidth/320)+'px';
  };

  if (!doc.addEventListener) return;
  win.addEventListener(spinEvt,recalc,false);
  doc.addEventListener('DOMContentLoaded',recalc,false);
})(document,window);

(function(doc){
  var enterGame = doc.getElementsByClassName(".startButton .optionButton .buttonText"),
  actionButtons = doc.getElementsByClassName('.functionButtons'),
  enter = function(){
    enterGame.style.animation = "runOut 0.5s";
    actionButtons.style.animation = 'runIn 0.5s';
  },
  leave = function(){
    element.style.animation = "runIn 0.5s";
  };
  if(!enterGame.addEventListener||!actionButtons.addEventListener) return;
  enterGame.addEventListener('touchend',enter);  
})(document)