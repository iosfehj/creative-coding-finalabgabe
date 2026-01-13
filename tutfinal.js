// Warte bis die Seite geladen ist
window.addEventListener("DOMContentLoaded", function() {
  
  // Hol die HTML-Elemente
  var textbox = document.getElementById("textbox");
  var textElement = document.getElementById("textbox-text");
  var doneButton = document.getElementById("doneButton");

  // Hol den Text aus dem HTML
  var text = textElement.innerHTML;
  
  // Mach alles unsichtbar am Anfang
  textElement. innerHTML = "";
  textbox. style.opacity = 0;
  doneButton.style.opacity = 0;

  // Warte kurz, dann zeig die Textbox
  setTimeout(function() {
    textbox.style.opacity = 1;
    
    // Tippe den Text Buchstabe für Buchstabe
    var i = 0;
    var speed = 25;
    
    function schreiben() {
      if (i < text.length) {
        // Füge nächsten Buchstaben hinzu
        if (text[i] === "<") {
          // HTML-Tags komplett einfügen
          var end = text.indexOf(">", i);
          textElement.innerHTML += text.slice(i, end + 1);
          i = end + 1;
        } else {
          textElement.innerHTML += text[i];
          i++;
        }
        setTimeout(schreiben, speed);
      } else {
        // Fertig!  Zeig den Button
        doneButton.style.opacity = 1;
      }
    }
    
    schreiben();
  }, 500);

});