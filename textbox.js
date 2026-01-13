// textbox-main.js
window.hasCustomTypewriter = true;

window.addEventListener("DOMContentLoaded", () => {
  const textbox = document.getElementById("textbox");
  const textElement = document.getElementById("textbox-text");
  const nextBox = document.getElementById("nextBox");
  const doneBox = document.getElementById("doneBox");

  if (!textbox || !textElement) return;

  let isTyping = false;

  function typeText(text, callback) {
    isTyping = true;
    textElement.innerHTML = "";
    if (nextBox) {
      nextBox.style.opacity = 0;
      nextBox.style.pointerEvents = "none";
    }

    let i = 0;
    const speed = 25;

    function typeWriter() {
      if (i < text.length) {
        if (text[i] === "<") {
          const end = text.indexOf(">", i);
          if (end === -1) {
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
        isTyping = false;
        if (nextBox) {
          nextBox.style.opacity = 1;
          nextBox.style.pointerEvents = "auto";
        }
        if (callback) callback();
      }
    }

    typeWriter();
  }

  // Box erscheint sofort beim Laden
  textbox.style.opacity = 0;
  setTimeout(() => {
    textbox.style.opacity = 1;
    typeText(textElement.innerHTML);
  }, 200);

  // DONE-Button schließt die Box
  if (doneBox) {
    doneBox.addEventListener("click", () => {
      textbox.style.opacity = 0;
    });
  }

  // NEXT-Button klick → Weiterleitung/weiterer Text wird in anderem JS definiert
  if (nextBox) {
    window.nextBoxElement = nextBox; // export für andere JS-Dateien
    window.typeText = typeText;      // export Typewriter Funktion
  }
});
