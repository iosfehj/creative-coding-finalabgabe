/* timer.js */
window.addEventListener("DOMContentLoaded", () => {
    
    // 1. STATS ABZUG & TODES-CHECK
    function drainStats() {
        const bars = document.querySelectorAll(".circle-bar");
        bars.forEach(bar => {
            const fullCircles = bar.querySelectorAll(".fcircle");
            if (fullCircles.length > 0) {
                const lastCircle = fullCircles[fullCircles.length - 1];
                lastCircle.src = "emptycircle.png"; 
                lastCircle.classList.remove("fcircle");
                lastCircle.classList.add("ecircle");
            }
        });

        // Prüfen ob alle Kreise in allen Leisten leer sind
        const allRemaining = document.querySelectorAll(".fcircle");
        if (allRemaining.length === 0) {
            window.location.href = "death.html";
        }
    }
    
    // Intervall starten
    setInterval(drainStats, 60000);

    // 2. EVOLUTIONS TIMER
    const TIME_TO_KIND = 10000;  // 5 Min
    const TIME_TO_ADULT = 20000; // 10 Min (nach Kind)

    setTimeout(() => {
        if (typeof startChildPhase === "function") {
            startChildPhase();
            
            // Zweiten Timer erst starten, wenn Kind-Phase erreicht
            setTimeout(() => {
                if (typeof startAdultPhase === "function") {
                    startAdultPhase();
                }
            }, TIME_TO_ADULT);
        }
    }, TIME_TO_KIND);
});