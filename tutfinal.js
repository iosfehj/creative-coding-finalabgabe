window.addEventListener("DOMContentLoaded", () => {
  // 1️⃣ HTML-Elemente
  const textbox = document.getElementById("textbox");        // gesamte Textbox
  const textElement = document.getElementById("textbox-text"); // Text, der getippt wird
  const doneButton = document.getElementById("doneButton");   // DONE-Button

  if (!textbox || !textElement || !doneButton) return;

  // 2️⃣ Statusvariable
  let isTyping = false; // true = gerade tippen

  // 3️⃣ Text aus HTML holen
  const firstText = textElement.innerHTML;  
  textElement.innerHTML = ""; // Textfeld leer machen
  textbox.style.opacity = 0;  // Box zunächst unsichtbar
  doneButton.style.opacity = 0; 
  doneButton.style.pointerEvents = "none"; // Button während Tippen deaktiviert

  // 4️⃣ Typewriter-Funktion
  function typeText(text) {
    isTyping = true;
    textElement.innerHTML = "";
    doneButton.style.opacity = 0;
    doneButton.style.pointerEvents = "none";

    let i = 0;
    const speed = 25; // Millisekunden pro Buchstabe

    function typeWriter() {
      if (i < text.length) {
        if (text[i] === "<") {
          // HTML-Tags korrekt einfügen
          const end = text.indexOf(">", i);
          if (end === -1) {
            textElement.innerHTML += "<";
            i++;
          } else {
            textElement.innerHTML += text.slice(i, end + 1);
            i = end + 1;
          }
        } else {
          textElement.innerHTML += text[i];
          i++;
        }
        setTimeout(typeWriter, speed);
      } else {
        // Text fertig getippt
        isTyping = false;
        doneButton.style.opacity = 1;          // Button sichtbar
        doneButton.style.pointerEvents = "auto"; // Button klickbar
      }
    }

    typeWriter();
  }

  // 5️⃣ Start: Textbox einblenden + ersten Text tippen
  setTimeout(() => {
    textbox.style.opacity = 1;
    typeText(firstText);
  }, 500);

  // 6️⃣ DONE-Button Klick → Box ausblenden
  doneButton.addEventListener("click", () => {
    if (isTyping) return; // während Tippen keine Aktion erlaubt

    // Box ausblenden
    textbox.style.opacity = 0;
    doneButton.style.pointerEvents = "none";
  });
});