let playerEl = document.querySelector("#player");
let enemyEl = document.querySelector("#enemy");
let jumpBtn = document.querySelector("button");
let gameAreaEl = document.querySelector("#game-area");
let gameOverEl = document.querySelector("#game-over");
let explosionEl = document.querySelector("#explosion");
let scoreEl = document.querySelector("#score");
let latestScoreEl = document.querySelector("#latest-score");

function startGame() {
  gameOverEl.style.display = "none";
  playerEl.classList.remove("idling");
  playerEl.classList.add("walking");
  setTimeout(function () {
    enemyEl.classList.add("enemy-start");
  }, 3000);
}

function jump() {
  if (playerEl.classList != "jump") {
    playerEl.classList.add("jump");
  }
  setTimeout(function () {
    playerEl.classList.remove("jump");
  }, 500);
}

let checkDead = setInterval(function () {
  let playerTop = parseInt(
    window.getComputedStyle(playerEl).getPropertyValue("top")
  );
  let enemyLeft = parseInt(
    window.getComputedStyle(enemyEl).getPropertyValue("left")
  );
  if (enemyLeft < 363 && enemyLeft > 325 && playerTop >= 218) {
    enemyEl.classList.remove("enemy-start");
    gameOverEl.style.display = "block";
    playerEl.classList.remove("walking");
    explosionEl.style.display = "block";
    setTimeout(function () {
      explosionEl.style.display = "none";
    }, 950);
    latestScoreEl.innerHTML = "LATEST SCORE : " + scoreEl.innerText;
    scoreEl.innerHTML = "0";
  }
}, 10);

document.body.addEventListener("keydown", function (event) {
  if (event.keyCode === 32) {
    jump();
  }
});

let trackScore = setInterval(function () {
  let enemyLeft = parseInt(
    window.getComputedStyle(enemyEl).getPropertyValue("left")
  );
  if (enemyLeft < 350 && enemyLeft > 340) {
    let currentScore = parseInt(scoreEl.innerText);
    currentScore += 1;
    scoreEl.innerHTML = currentScore;
  }
}, 10);
