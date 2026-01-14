/* death-textbox.js - Typewriter ohne Flackern */

window.addEventListener("DOMContentLoaded", () => {
  
  // Elemente holen
  const textbox = document.getElementById("death-textbox");
  const textElement = document.getElementById("death-text");
  const nextBox = document.getElementById("death-next-box");

  // Prüfen ob alles da ist
  if (!textbox || !textElement || !nextBox) {
    console.error("Death Textbox Elemente fehlen!");
    return;
  }

  // Text sofort speichern und leeren
  const originalText = textElement.textContent.trim();
  textElement.textContent = "";  // ← SOFORT LEEREN beim Laden! 

  // === TYPEWRITER FUNKTION ===
  function startTypewriter(text) {
    textElement.textContent = "";  // Sicherstellen dass leer
    nextBox.style. opacity = 0;

    let index = 0;
    const speed = 30; // Millisekunden pro Buchstabe

    function type() {
      if (index < text.length) {
        textElement.textContent += text[index];
        index++;
        setTimeout(type, speed);
      } else {
        // Fertig - NEXT Button anzeigen
        nextBox.style.opacity = 1;
      }
    }

    type();
  }

  // === TEXTBOX AKTIVIEREN ===
  window.activateDeathTextbox = function() {
    // Textbox anzeigen
    textbox.classList.add("active");
    
    // Kurze Verzögerung, dann Typewriter
    setTimeout(() => {
      startTypewriter(originalText);
    }, 300);
  };

  console.log("✅ death-textbox. js geladen");
});
