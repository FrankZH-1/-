
window.onload = () => {
  var socket = io();
  socket.emit('setRoomStart');
  var gods = document.querySelectorAll(".gods"),
    wolves = document.querySelector('.wolves'),
    villagers = document.querySelector('.villagers'),
    submit = document.querySelector('.confirm'),
    save = document.querySelector('.save'),
    roomName = document.querySelector('.roomName'),
    playerNumber = document.querySelector('.persons'),
    winningCondition = document.querySelector('.selectMode'),
    characters = document.querySelectorAll('.characterIcons');

  // 动画模块


  // 封装数据&核验
  var roomInfo = {
    roomName,
    playerNumber:6,
    winningCondition:"clearSide",
    characterDetails:{wolves:1,villagers:0}
  };

  var characterDetails = {
    villagers:0,
    wolves:0,
    witch:0,
    prophet:0,
    hunter:0,
    idiot:0
  };

  var checkNumber = function(obj,num){
    var count = 0,
      people = 0;
    for(var i in obj){
      if (obj[i])
        count ++;
    }
    if (count>2){
      for(var j in obj){
        people += obj[j];
      }
      if(people < num)
        console.log('chose people:'+people+" is less than set people:"+num);//换成动画:提示bar
      if(people > num)
        console.log('chose people:'+people+" is more than set people:"+num);
      else if(people === num)
        console.log('chose people:'+people+" is equal to set people:"+num);
    }
  }

  roomName.addEventListener('change',() => {
    roomInfo.roomName = roomName.value;
  });

  playerNumber.addEventListener('change',()=>{
    roomInfo.playerNumber = playerNumber.value;
    checkNumber(characterDetails,roomInfo.playerNumber);
  });

  winningCondition.addEventListener('change',()=>{
    roomInfo.winningCondition = winningCondition.value;
  });

  Array.prototype.forEach.call(gods,(element)=>{
    element.addEventListener('touchend',()=>{
      var character = element.className.split(' ')[2];
      characterDetails[character] = characterDetails[character]^1;
      checkNumber(characterDetails,roomInfo.playerNumber);
    })
  })

  villagers.addEventListener('change',function(){
    characterDetails.villagers = parseInt(villagers.value);
    checkNumber(characterDetails,roomInfo.playerNumber);
  })

  wolves.addEventListener('change',()=>{
    characterDetails.wolves = parseInt(wolves.value);
    checkNumber(characterDetails,roomInfo.playerNumber);
  })

  submit.addEventListener('touchend',()=>{
    //核对信息
    roomInfo.characterDetails = characterDetails;
    socket.emit('setRoomEnd',roomInfo);
  })


}
