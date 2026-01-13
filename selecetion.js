// Warte bis die Seite geladen ist
window.addEventListener("DOMContentLoaded", function() {
    
    // Hol alle Symbole und die Auswahlbox
    var symbols = document.querySelectorAll(".symbol-item");
    var selectionBox = document.querySelector(".selection-box");
    
    // Welches Symbol ist ausgewählt?  (0 = EAT, 1 = GAME, 2 = SUN)
    var selected = 0;
    
    // Feste Positionen der 3 Symbole (passend zur HTML-Reihenfolge)
    var positions = [
        { top:  "87%", left: "19%" },  // 0: EAT (unten links)
        { top: "85%", left: "85%" },  // 1: GAME (unten rechts)
        { top: "15%", left: "90%" }   // 2: SUN-CHOICE (oben rechts)
    ];
    
    // Bewege die Selection-Box zur aktuellen Position
    function updateSelection() {
        // Entferne Wackel-Animation von allen Symbolen
        symbols.forEach(function(symbol) {
            symbol.classList.remove("selected");
        });
        
        // Füge Wackel-Animation zum ausgewählten Symbol hinzu
        symbols[selected].classList.add("selected");
        
        // Bewege die Box zur Position des Symbols
        var pos = positions[selected];
        selectionBox.style.top = pos.top;
        selectionBox.style.left = pos.left;
    }
    
    // Zeige Box beim Start auf dem ersten Symbol (EAT)
    updateSelection();
    
    // Tastatur-Steuerung
    document.addEventListener("keydown", function(event) {
        
        var key = event.key.toLowerCase();
        
        // A-Taste = vorheriges Symbol
        if (key === "a") {
            selected = selected - 1;
            
            // Wenn unter 0, springe zum letzten Symbol
            if (selected < 0) {
                selected = 2; // SUN
            }
            
            updateSelection();
            event.preventDefault();
        }
        
        // D-Taste = nächstes Symbol
        if (key === "d") {
            selected = selected + 1;
            
            // Wenn über 2, springe zum ersten Symbol
            if (selected > 2) {
                selected = 0; // EAT
            }
            
            updateSelection();
            event.preventDefault();
        }
        
        // W-Taste = nach oben (zu SUN wenn unten)
        if (key === "w") {
            if (selected === 0 || selected === 1) {
                // Von EAT oder GAME → zu SUN
                selected = 2;
                updateSelection();
            }
            event.preventDefault();
        }
        
        // S-Taste = nach unten (zu EAT/GAME wenn oben)
        if (key === "s") {
            if (selected === 2) {
                // Von SUN → zu EAT
                selected = 0;
                updateSelection();
            }
            event.preventDefault();
        }
        
        // Leertaste = Bestätigen
        if (key === " " || event.code === "Space") {
            // Hol die Zielseite vom Symbol
            var page = symbols[selected].getAttribute("data-page");
            
            // Gehe zur Seite
            window.location.href = page;
            
            event.preventDefault();
        }
        
    });
    
    // Bonus: Klick auf Symbol
    symbols.forEach(function(symbol, index) {
        symbol.addEventListener("click", function() {
            selected = index;
            updateSelection();
            
            // Nach kurzer Wackel-Animation zur Seite gehen
            setTimeout(function() {
                var page = symbol.getAttribute("data-page");
                window.location.href = page;
            }, 300);
        });
    });
    
});