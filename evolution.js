/* evolution.js */

// Globaler Zustand
let currentPhase = "baby";
let childVariant = null; 

/* evolution.js - Erweitert */

/* evolution.js */

function updatePetVisuals() {
    const petImg = document.getElementById("pet");
    const petNameDisplay = document.getElementById("petName");
    const miniPetImg = document.querySelector(".babie"); 

    if (!petImg || !petNameDisplay) return;

    let currentSrc = "";
    let currentClass = "";

    switch (currentPhase) {
        case "baby":
            currentSrc = "baby.png";
            currentClass = "baby";
            petNameDisplay.textContent = "babysy";
            break;

        case "kind":
            childVariant = childVariant || (Math.random() < 0.5 ? "childA" : "childB");
            currentSrc = childVariant + ".png";
            currentClass = childVariant;
            petNameDisplay.textContent = (childVariant === "childA") ? "Kidsy A" : "Kidsy B";
            break;

        case "adult":
            const adultType = (childVariant === "childA") ? "adultA" : "adultB";
            currentSrc = adultType + ".png";
            currentClass = adultType;
            petNameDisplay.textContent = (adultType === "adultA") ? "Mega-Sy" : "Giga-Sy";
            break;
    }

    // Großes Pet aktualisieren
    petImg.src = currentSrc;
    petImg.className = "pet " + currentClass;

    // Kleines Pet im Play-Fenster aktualisieren
    if (miniPetImg) {
        miniPetImg.src = currentSrc;
        // Ersetzt alle Klassen durch "babie" + die neue Phase (z.B. "babie childA")
        miniPetImg.className = "babie " + currentClass;
    }
}

// Funktionen für den Timer
function startChildPhase() {
    currentPhase = "kind";
    updatePetVisuals();
}

function startAdultPhase() {
    currentPhase = "adult";
    updatePetVisuals();
}