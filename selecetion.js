/* selection.js */
window.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector(".selection-box");
  const gameArea = document.querySelector(".game-area");
  const eatPopup = document.querySelector(".window");
  const playPopup = document.querySelector(".pwindow");
  const sun = document.querySelector(".sun");
  const burgirImg = document.querySelector(".burgir");

  if (!box || !gameArea || !eatPopup || !playPopup || !sun) return;

  eatPopup.style.display = "none";
  playPopup.style.display = "none";

  let currentIndex = 0;
  let activeMode = null; 
  let miniRounds = 0;    
  let canPlayTurn = true; 

  const symbols = [
    document.querySelector(".eat"),
    document.querySelector(".game"),
    sun
  ];

  /* STATS AUFFÜLLEN */
  function fillStat(index) {
    const bars = document.querySelectorAll(".circle-bar");
    const bar = bars[index];
    const firstEmpty = bar.querySelector(".ecircle"); 
    if (firstEmpty) {
      firstEmpty.src = "filledcircle.png";
      firstEmpty.classList.remove("ecircle");
      firstEmpty.classList.add("fcircle");
    }
  }

  /* BURGER KLICK */
  if (burgirImg) {
    burgirImg.addEventListener("click", () => {
      if (activeMode === "eat") {
        fillStat(0); // Hunger
        burgirImg.style.transform = "scale(1.2)";
        setTimeout(() => burgirImg.style.transform = "scale(1)", 100);
      }
    });
  }

  /* NAVIGATION */
  function updateBoxPosition() {
    const rect = gameArea.getBoundingClientRect();
    const positions = [
      { left: 50, top: rect.height - 50 },               
      { left: rect.width - 50, top: rect.height - 50 }, 
      { left: rect.width - 50, top: 50 }                 
    ];
    const pos = positions[currentIndex];
    box.style.left = pos.left + "px";
    box.style.top = pos.top + "px";

    symbols.forEach(s => s && s.classList.remove("selected"));
    if (symbols[currentIndex]) symbols[currentIndex].classList.add("selected");
  }

  /* MINIGAME */
  function playTurn() {
    if (!canPlayTurn) return;
    canPlayTurn = false;
    const bubbleText = document.querySelector(".balloon-text");
    const scoreDisplay = document.querySelector("#play-score");
    
    miniRounds++;
    bubbleText.style.visibility = "visible";
    bubbleText.innerText = Math.random() < 0.5 ? "←" : "→";
    scoreDisplay.innerText = `round: ${miniRounds}/3`;

    if (miniRounds >= 3) fillStat(2); // Happiness

    setTimeout(() => {
      bubbleText.style.visibility = "hidden";
      if (miniRounds >= 3) {
          miniRounds = 0;
          scoreDisplay.innerText = "round: 0/3";
      }
      canPlayTurn = true;
    }, 600);
  }

  /* KEYBOARD */
  window.addEventListener("keydown", (e) => {
    if (activeMode === "play" && (e.code === "KeyA" || e.code === "KeyD")) {
      playTurn(); return;
    }
    if (activeMode && (e.code === "KeyA" || e.code === "KeyD")) return;

    if (e.code === "KeyA") {
      currentIndex = (currentIndex - 1 + 3) % 3;
      updateBoxPosition();
    } else if (e.code === "KeyD") {
      currentIndex = (currentIndex + 1) % 3;
      updateBoxPosition();
    }

    if (e.code === "Space") {
      if (currentIndex === 0) { // EAT
        activeMode = (activeMode === "eat") ? null : "eat";
        eatPopup.style.display = activeMode ? "flex" : "none";
      } else if (currentIndex === 1) { // PLAY
        activeMode = (activeMode === "play") ? null : "play";
        playPopup.style.display = activeMode ? "flex" : "none";
      } else if (currentIndex === 2) { // SLEEP
        if (activeMode === "sleep") {
          gameArea.classList.remove("dark");
          sun.style.display = "block";
          document.querySelectorAll(".moon, .sleepy").forEach(el => el.remove());
          activeMode = null;
        } else if (!activeMode) {
          activeMode = "sleep";
          gameArea.classList.add("dark");
          sun.style.display = "none";
          fillStat(1); // Energy
          const m = document.createElement("img"); m.src="moon.png"; m.className="moon";
          const s = document.createElement("img"); s.src="sleepy.png"; s.className="sleepy";
          gameArea.append(m, s);
        }
      }
    }
  });

  window.addEventListener("resize", updateBoxPosition);
  updateBoxPosition();
});