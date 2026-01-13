// textbox.js – simplified ohne NEXT-Button
window.addEventListener("DOMContentLoaded", () => {
  const textbox = document.getElementById("textbox");
  const textElement = document.getElementById("textbox-text");

  if (!textbox || !textElement) return;

  const text = textElement.innerHTML; // Text aus HTML
  textElement.innerHTML = "";          // leeren für Typewriter

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
    }
  }

  // Box einblenden + Typewriter starten
  textbox.style.opacity = 0;
  setTimeout(() => {
    textbox.style.opacity = 1;
    typeWriter();
  }, 200);
});
