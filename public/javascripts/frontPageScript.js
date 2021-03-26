window.onload = function () {
  var startGame = document.querySelector(".startButton"),
    functionButtons = document.querySelectorAll(".functionButtons a .optionButton"),
    backButton = document.querySelector(".functionButtons a:last-child"),
  clickStart = function () {
    startGame.style.animation = "moveOut 0.4s forwards";
    (function () {
      for (let i = 0; i < functionButtons.length; i++) {
        setTimeout(() => {
          functionButtons[i].style.animation = "moveIn 0.4s forwards";
        }, i * 50);
      }
    }
    )();
  },
  clickBack = function () {
    startGame.style.animation = "moveIn 0.4s forwards";
    (function () {
      for (let i = 0; i < functionButtons.length; i++) {
        setTimeout(() => {
          functionButtons[i].style.animation = "moveOut 0.4s forwards";
        }, i * 50);
      }
    }
    )();
  };
  startGame.addEventListener("touchend", clickStart);
  backButton.addEventListener("touchend", clickBack);
}

