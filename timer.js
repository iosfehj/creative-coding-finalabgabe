/* timer.js */

window.addEventListener("DOMContentLoaded", () => {

    const TIME_TO_KIND = 300000;
    const TIME_TO_ADULT = 600000;
    const DRAIN_INTERVAL = 60000;

    function activateDeathScreen() {
        const overlay = document.getElementById("death-overlay");
        const currentPet = document.getElementById("pet");

        if (overlay) {
            // Nur den Schalter im CSS umlegen
            overlay.classList.add("active");
            
            // Das lebendige Pet verstecken
            if (currentPet) currentPet.style.display = "none";
            
            clearInterval(statTimer);
        }
    }

    function checkDeathCondition() {
        const bars = document.querySelectorAll(".circle-bar");
        let gameOver = false;

        bars.forEach(bar => {
            const fullCircles = bar.querySelectorAll(".fcircle");
            if (fullCircles.length === 0) {
                gameOver = true;
            }
        });

        if (gameOver) {
            activateDeathScreen();
        }
    }

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
        checkDeathCondition();
    }

    const statTimer = setInterval(drainStats, DRAIN_INTERVAL);

    // Evolution
    setTimeout(() => {
        if (typeof startChildPhase === "function") {
            startChildPhase();
            setTimeout(() => {
                if (typeof startAdultPhase === "function") {
                    startAdultPhase();
                }
            }, TIME_TO_ADULT);
        }
    }, TIME_TO_KIND);
});