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
            if (!childVariant) {
                const rand = Math.random();
                if (rand < 0.25) childVariant = "childA";
                else if (rand < 0.5) childVariant = "childB";
                else if (rand < 0.75) childVariant = "childC";
                else childVariant = "childD";
            }
            currentSrc = childVariant + ".png";
            currentClass = childVariant;
            if (childVariant === "childA") petNameDisplay.textContent = "gigasy";
            else if (childVariant === "childB") petNameDisplay.textContent = "sulleysy";
            else if (childVariant === "childC") petNameDisplay.textContent = "bertisy";
            else petNameDisplay.textContent = "patisy";
            break;

        case "adult":
            let adultType;
            if (childVariant === "childA") adultType = "adultA";
            else if (childVariant === "childB") adultType = "adultB";
            else if (childVariant === "childC") adultType = "adultC";
            else adultType = "adultD";
            currentSrc = adultType + ".png";
            currentClass = adultType;
            if (adultType === "adultA") petNameDisplay.textContent = "Gigachad";
            else if (adultType === "adultB") petNameDisplay.textContent = "Sulleyla";
            else if (adultType === "adultC") petNameDisplay.textContent = "Mausbert";
            else petNameDisplay.textContent = "Patrik";
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