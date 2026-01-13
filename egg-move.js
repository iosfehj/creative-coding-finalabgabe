window.addEventListener("DOMContentLoaded", () => {
    const egg = document.getElementById("egg");  //Das Ei-Element

    let clickCount = 0; // zählt, wie oft der Spieler L/R drückt
    let position = 50;  // Startposition in Prozent (50% = Mitte)
    const step = 5;     // Schrittgröße in Prozent pro Tastendruck

    window.addEventListener("keydown", (e) => {  // auf Tastendrücke reagieren

    // links bewegen
    if (e.key === "a" || e.key === "A") {
    position -= step;       // Position um 'step' nach links verschieben, wenn 'A' gedrückt wird
    if (position < 0) position = 0; // nicht über den linken Rand hinaus
    egg.style.left = position + "%"; 
    clickCount++;           // Zähler erhöhen
    }

    //rechts bewegen
    else if (e.key === "d" || e.key === "D") {
    position += step;       // Position um 'step' nach rechts verschieben, wenn 'D' gedrückt wird
    if (position > 100) position = 100; // nicht über den rechten Rand hinaus
    egg.style.left = position + "%";
    clickCount++;
    }


    // Weiterleitung nach 20 Tastendrücken
    if (clickCount >= 10) {
      window.location.href = "birth.html";
    }
  });
});
