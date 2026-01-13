// Warte bis die Seite geladen ist
window.addEventListener("DOMContentLoaded", function() {
    
    // Hol alle Symbol-Boxen
    var symbols = document. querySelectorAll(". symbol-box");
    
    // Welches Symbol ist gerade ausgewählt?  (Start:  0 = EAT)
    var selected = 0;
    
    // Zeig das erste Symbol als ausgewählt
    symbols[selected].classList.add("selected");
    
    // Tastatur-Event
    document.addEventListener("keydown", function(event) {
        
        var key = event.key. toLowerCase();
        
        // A-Taste = nach links
        if (key === "a") {
            // Entferne die Auswahl vom aktuellen Symbol
            symbols[selected].classList.remove("selected");
            
            // Gehe eins nach links
            selected = selected - 1;
            
            // Wenn zu weit links, gehe ganz nach rechts
            if (selected < 0) {
                selected = symbols.length - 1;
            }
            
            // Zeige neue Auswahl
            symbols[selected].classList.add("selected");
        }
        
        // D-Taste = nach rechts
        if (key === "d") {
            // Entferne die Auswahl vom aktuellen Symbol
            symbols[selected].classList. remove("selected");
            
            // Gehe eins nach rechts
            selected = selected + 1;
            
            // Wenn zu weit rechts, gehe ganz nach links
            if (selected >= symbols.length) {
                selected = 0;
            }
            
            // Zeige neue Auswahl
            symbols[selected].classList.add("selected");
        }
        
        // Leertaste = Bestätigen
        if (key === " " || event.code === "Space") {
            // Hol die Seite aus dem data-page Attribut
            var page = symbols[selected].getAttribute("data-page");
            
            // Gehe zur Seite
            window.location.href = page;
            
            // Verhindere, dass die Seite scrollt
            event.preventDefault();
        }
        
    });
    
    // Bonus: Klick auf Symbol funktioniert auch
    symbols.forEach(function(symbol, index) {
        symbol.addEventListener("click", function() {
            // Gehe zur Seite
            var page = symbol.getAttribute("data-page");
            window.location.href = page;
        });
    });
    
});