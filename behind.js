// behind.js – Allgemeine Funktionen für Textbox und Typewriter
window.addEventListener("DOMContentLoaded", () => {
  if (window.hasCustomTypewriter) return;
  const textbox = document.getElementById("textbox");
  const textElementOriginal = document.getElementById("textbox-text");
  const nextBox = document.getElementById("nextBox");

  if (!textbox) {
    console.error("behind.js: #textbox fehlt");
    return;
  }

  // Fallback: wenn es kein separates #textbox-text gibt, nutze #textbox selbst
  const textElement = textElementOriginal || textbox;
  let text = textElement.innerHTML;

  // Fallbacktext, falls HTML leer
  if (!text || text.trim() === "") {
    text = "To bring your future pet into the world, click on A and  for it to hatch!";
  }

  textElement.innerHTML = ""; // Text leer machen
  if (nextBox) nextBox.style.opacity = 0; // NEXT verstecken

  // Textbox erscheint nach 0,5 Sekunden
  setTimeout(() => {
    textbox.style.opacity = 1;

    let i = 0;
    const speed = 25;
    text = String(text);

    function typeWriter() {
      if (i < text.length) {
        if (text[i] === "<") {
          const end = text.indexOf(">", i);
          if (end === -1) {
            // Falls Tag unvollständig, einfach '<' ausgeben
            textElement.innerHTML += "<";
            i++;
          } else {
            textElement.innerHTML += text.slice(i, end + 1);
            i = end + 1;
          }
        } else {
          textElement.innerHTML += text[i++];
        }
        setTimeout(typeWriter, speed);
      } else {
        // Text fertig → NEXT anzeigen, falls vorhanden
        if (nextBox) nextBox.style.opacity = 1;
      }
    }

    // Starte Typewriter
    try {
      typeWriter();
    } catch (err) {
      console.error("behind.js: typeWriter failed", err);
      textElement.innerHTML = text;
      if (nextBox) nextBox.style.opacity = 1;
    }
  }, 500);

  // Leertaste schließt die Box (optional)
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      textbox.style.opacity = 0;
    }
  });
});

