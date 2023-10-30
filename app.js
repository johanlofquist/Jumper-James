import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://jumper-james-default-rtdb.europe-west1.firebasedatabase.app",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const highscoreindb = ref(database, "highscore");
const usernameindb = ref(database, "username");

let playerEl = document.querySelector("#player");
let enemyEl = document.querySelector("#enemy");
let jumpBtn = document.querySelector("button");
let gameAreaEl = document.querySelector("#game-area");
let gameOverEl = document.querySelector("#game-over");
let explosionEl = document.querySelector("#explosion");
let scoreEl = document.querySelector("#score");
let latestScoreEl = document.querySelector("#latest-score");
let highScoreEl = document.querySelector("#high-score");
let startBtn = document.querySelector("#start-btn");
let currentScore = 0;
let highScore = 0

onValue(usernameindb, function (snapshot) {
  if (snapshot.exists()) {
    let item2 = Object.entries(snapshot.val());
    highScoreEl.innerHTML = "HIGH SCORE: " + item2[0][1]
  } 
});
onValue(highscoreindb, function (snapshot) {
  if (snapshot.exists()) {
    let item1 = Object.entries(snapshot.val());
    highScoreEl.innerHTML += " " + item1[0][1]
    highScore = item1[0][1]
  } 
});

gameAreaEl.addEventListener("click", jump)

function startGame() {
  currentScore = 0;
  scoreEl.innerHTML = 0;
  gameOverEl.style.display = "none";
  playerEl.classList.remove("idling");
  playerEl.classList.add("walking");
  setTimeout(function () {
    enemyEl.classList.add("enemy-start");
  }, 3000);
}
startBtn.addEventListener("click", startGame);

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
    scoreEl.innerHTML = "0";
    setTimeout(function () {
      explosionEl.style.display = "none";
    }, 950);
    latestScoreEl.innerHTML = "LATEST SCORE : " + currentScore;
    if (currentScore > highScore) {
      highScore = currentScore;
      let userName = prompt("Sweet, new highscore! Please enter your name");
      highScoreEl.innerHTML = "HIGH SCORE : " + userName + " " + highScore;
      remove(ref(database, "highscore"));
      remove(ref(database, "username"));
      push(usernameindb, userName);
      push(highscoreindb, highScore);
    }
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
    currentScore += 1;
    scoreEl.innerHTML = currentScore;
  }
}, 10);
