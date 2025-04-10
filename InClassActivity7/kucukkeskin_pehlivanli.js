const button = document.getElementById("moveBtn");
const gameArea = document.getElementById("gameArea");
const statusText = document.getElementById("status");

let clickCount = 0;
let level = 1;
let timeout = 500;
let moveTimeout = null;

function moveButton() {
  const maxLeft = gameArea.clientWidth - button.offsetWidth;
  const maxTop = gameArea.clientHeight - button.offsetHeight;

  const newLeft = Math.random() * maxLeft;
  const newTop = Math.random() * maxTop;

  button.style.marginLeft = newLeft + "px";
  button.style.marginTop = newTop + "px";
}

function handleMouseOver() {
  if (moveTimeout !== null) {
    clearTimeout(moveTimeout);
  }

  // Buton belirtilen timeout süresi sonra hareket etsin
  moveTimeout = setTimeout(() => {
    moveButton();
  }, timeout);
}

function handleClick() {
  clickCount++;

  if (clickCount >= 3) {
    level++;
    clickCount = 0;

    if (level > 6) {
      statusText.textContent = "🏁 You beat all levels!";
      button.style.display = "none";
      return;
    }

    timeout = Math.max(0, 500 - (level - 1) * 100);
    statusText.textContent = `🔥 Level ${level} started! Reaction time: ${timeout}ms`;
  } else {
    statusText.textContent = `✅ You clicked ${clickCount} time(s).`;
  }
}

button.addEventListener("mouseover", handleMouseOver);
button.addEventListener("click", handleClick);
