/* death-textbox.js - Mit CSS Opacity */

window.addEventListener("DOMContentLoaded", () => {
  
  const textbox = document.getElementById("death-textbox");
  const textElement = document.getElementById("death-text");
  const nextBox = document.getElementById("death-next-box");

  if (!textbox || !textElement || !nextBox) {
    console.error("Death Textbox Elemente fehlen!");
    return;
  }

  // Text speichern, dann leeren
  const originalText = textElement.textContent.trim();
  textElement.textContent = "";
  
  // Opacity auf 1 setzen (CSS startet mit 0)
  textElement.style.opacity = 1;

  // === TYPEWRITER FUNKTION ===
  function startTypewriter(text) {
    textElement.textContent = "";
    nextBox.style. opacity = 0;

    let index = 0;
    const speed = 30;

    function type() {
      if (index < text.length) {
        textElement.textContent += text[index];
        index++;
        setTimeout(type, speed);
      } else {
        nextBox.style.opacity = 1;
      }
    }

    type();
  }

  // === TEXTBOX AKTIVIEREN ===
  window.activateDeathTextbox = function() {
    textbox.classList. add("active");
    
    setTimeout(() => {
      startTypewriter(originalText);
    }, 300);
  };

  console.log("✅ death-textbox.js geladen");
});