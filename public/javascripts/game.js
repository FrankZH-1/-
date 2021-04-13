var globalStatus;
var selfStatus = {
  id: "",
  character: "",
  nightAction: undefined,
};

window.onload = () => {
  var socket = io();

  socket.emit("gameStart");

  socket.on('changedStatus', function set(data) {
    globalStatus = JSON.parse(data);
  })


  var winningCondition = globalStatus.winningCondition;

  (function localMoves() {
    //ANIMATION
  }())
  //return 0 未分胜负 1 狼人胜 2 神民胜
  var judgeEnd = function (Condition, Status) {
    var playerList = Status.playerList;
    var deadWolves, deadHuman, deadGods, totalWolves, totalHuman, totalGods = 0;
    for (var i in playerList) {
      if (playerList[i].character == 'wolves') {
        totalWolves += 1;
        deadWolves += (!playerList[i].living);
      }
      else if (playerList[i].character == 'villagers') {
        totalHuman += 1;
        deadHuman += (!playerList[i].living);
      }
      else {
        totalGods += 1;
        deadGods += (!playerList[i].living);
      }
    }
    if (Condition == "clearSide")
      if (deadHuman == totalHuman || deadGods == totalGods)
        return 1;
      else
        return 0;
    else if (Condition == "clearVillage")
      if ((totalWolves - deadWolves) >= (totalHuman + totalGods - deadGods - deadHuman))
        return 1;
      else
        return 0;
    else if (totalWolves == deadWolves)
      return 2;
  }

  //夜晚行动
  var arrangeActionOrder = function (Status) {
    var playerStatus = Status.playerList;
    var orderList = [];
    for (let i in playerStatus) {
      if (playerStatus[i].living) {
        if (playerStatus[i].act) {
          orderList.push(playerStatus[i].character);
        }
      }
      else {
        if (playerList[i].character == "hunter") {
          if (playerStatus[i].act) {
            orderList.push("hunter");
          }
        }
      }

    }

  };

  var wolvesAction = function (Status) {

  };

  var witchAction = function (Status) {

  };

  var prophetAction = function (Status) {

  };

  var hunterAction = function (Status) {

  };

  var idiotAction = function (Status) {

  };

  var villagersAction = function (Status) {

  }

  //白天行动

  //修改状态
  var modifyStatus = function (Status, key, value) {

  }
  var createSelfStatus = function (selfInfo, data) {
    for (var i in data.playerList) {
      if (selfInfo.id == data.playerList[i].id) {
        for (var j in data.playerList[i]) {
          selfInfo[j] = data.playerList[i][j];
        }
      }
    }
    if (selfInfo.character == "wolves")
      selfInfo.nightAction = wolvesAction;
    else if (selfInfo.character == "witch")
      selfInfo.nightAction = witchAction;
    else if (selfInfo.character == "prophet")
      selfInfo.nightAction = prophetAction;
    else if (selfInfo.character == "hunter")
      selfInfo.nightAction = hunterAction;
    else if (selfInfo.character == "idiot")
      selfInfo.nightAction = idiotAction;
    else if (selfInfo.character == "villagers")
      selfInfo.nightAction = villagersAction;
  }

  socket.on('globalChanged', solve(data));

  var solve = function (data) {
    globalStatus = JSON.parse(data);
    createSelfStatus(globalStatus);

    if (globalStatus.firstDay) {
      if (!globalStatus.time) {//第一夜
        var actionOrder = arrangeActionOrder(globalStatus);
        if (actionOrder[0] == selfStatus.character) {
          selfStatus.nightAction(globalStatus);
        }
      }
      else if (globalStatus.time) {//第一天白天

      }
    }
    else if (!globalStatus.firstDay) {
      if (!globalStatus.time) {//第二夜及以后
        var actionOrder = arrangeActionOrder(globalStatus);
        if (actionOrder[0] == selfStatus.character) {
          selfStatus.nightAction(globalStatus);
        }
        else if (globalStatus.time) {//第二天白天及以后

        }
      }
    }
  }