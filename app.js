let playerEl = document.querySelector("#player");
let enemyEl = document.querySelector("#enemy");
let jumpBtn = document.querySelector("button");

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
  if (enemyLeft < 319 && enemyLeft > 270 && playerTop >= 218) {
    enemyEl.style.animation = "none";
    enemyEl.style.display = "none";
    alert("You lose!");
  }
}, 10);

document.body.addEventListener("keydown", function (event) {
  if (event.keyCode === 32) {
    jump();
  }
});
