
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
    playerNumber: 6,
    winningCondition: "clearSide",
    characterDetails: { wolves: 1, villagers: 0 }
  };

  var characterDetails = {
    wolves: 1,
    witch: 0,
    prophet: 0,
    hunter: 0,
    idiot: 0,
    villagers: 0
  };



  var checkNumber = function (obj, num) {
    var count = 0,
      people = 0;
    for (var i in obj) {
      if (obj[i])
        count++;
    }
    if (count > 2) {
      for (var j in obj) {
        people += obj[j];
      }
      if (people < num)
        console.log('chose people:' + people + " is less than set people:" + num);//换成动画:提示bar
      if (people > num)
        console.log('chose people:' + people + " is more than set people:" + num);
      else if (people == num)
        console.log('chose people:' + people + " is equal to set people:" + num);
    }
  }

  roomName.addEventListener('change', () => {
    roomInfo.roomName = roomName.value;
  });

  playerNumber.addEventListener('change', () => {
    roomInfo.playerNumber = playerNumber.value;
    checkNumber(characterDetails, roomInfo.playerNumber);
  });

  winningCondition.addEventListener('change', () => {
    roomInfo.winningCondition = winningCondition.value;
  });

  Array.prototype.forEach.call(gods, (element) => {
    element.addEventListener('touchend', () => {
      var character = element.className.split(' ')[2];
      characterDetails[character] = characterDetails[character] ^ 1;
      checkNumber(characterDetails, roomInfo.playerNumber);
    })
  })

  villagers.addEventListener('change', function () {
    characterDetails.villagers = parseInt(villagers.value);
    checkNumber(characterDetails, roomInfo.playerNumber);
  })

  wolves.addEventListener('change', () => {
    characterDetails.wolves = parseInt(wolves.value);
    checkNumber(characterDetails, roomInfo.playerNumber);
  })

  var generateGlobalStatus = function (infoObj) {
    var targetObj = new Object();
    targetObj.roomName = infoObj.roomName;
    targetObj.firstDay = true;
    targetObj.time = false;//false为夜晚，true为白天
    targetObj.playerList = [];
    targetObj.playerNumber = infoObj.playerNumber;
    targetObj.winningCondition = infoObj.winningCondition;
    targetObj.sheriffFeatured = false;
    targetObj.deathSentenced = false;
    targetObj.firstNightLeaveMessage = false;
    targetObj.featurePresentation = false;
    targetObj.sheriffOutcome = false;
    targetObj.exilePresentation = false;
    targetObj.exileFeature = false;
    targetObj.exileOutcome = false;
    targetObj.exileLeaveMessage = false;
    for (var i in infoObj.characterDetails) {
      console.log(1);
      if (infoObj.characterDetails[i]) {
        for (let j = 0; j < characterDetails[i]; j++) {
          var player = {};
          player.id = "";
          player.name = '';
          player.character = i;
          player.skill = false;
          player.living = true;
          player.speakable = true;
          player.act = true;
          player.deathSentence = false;
          player.leaveMessage = true;
          targetObj.playerList.push(player);
        }
      }
    }
    return targetObj;
  }



  submit.addEventListener('touchend', () => {
    //核对信息
    roomInfo.characterDetails = characterDetails;
    globalStatus = generateGlobalStatus(roomInfo);
    roomInfoJson = JSON.stringify(globalStatus);
    socket.emit('setRoomEnd', roomInfoJson);
  })


}
