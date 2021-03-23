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
  // console.log(functionButtons);
  // console.log(backButton);
  startGame.addEventListener("touchend", clickStart);
  backButton.addEventListener("touchend", clickBack);
}

