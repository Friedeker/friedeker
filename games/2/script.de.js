const basket = document.getElementById("basket");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("points");
const levelDisplay = document.getElementById("level");
const livesDisplay = document.getElementById("lives");

let points = 0;
let level = 1;
let lives = 10;
let objectSpeed = 4; // Počáteční rychlost objektů
let objectInterval = 1000; // Počáteční interval generování objektů

// Aktualizace zobrazení skóre, levelu a životů
function updateDisplay() {
    scoreDisplay.textContent = `Punkte: ${points}`;
    levelDisplay.textContent = `Level: ${level}`;
    livesDisplay.textContent = `Leben: ${lives}`;
}

// Pohyb košíku pomocí šipek
document.addEventListener("keydown", (event) => {
    const basketPosition = basket.offsetLeft;
    if (event.key === "ArrowLeft" && basketPosition > 0) {
        basket.style.left = basketPosition - 50 + "px";
    } else if (event.key === "ArrowRight" && basketPosition + basket.offsetWidth < gameArea.offsetWidth) {
        basket.style.left = basketPosition + 50 + "px";
    }
});

// Generování padajících objektů
function createObject() {
    const object = document.createElement("div");
    object.classList.add("object");
    object.style.left = Math.random() * (gameArea.offsetWidth - 20) + "px";
    object.style.top = "0px";
    gameArea.appendChild(object);

    const fallInterval = setInterval(() => {
        const objectTop = object.offsetTop;
        const basketRect = basket.getBoundingClientRect();
        const objectRect = object.getBoundingClientRect();

        // Pokud objekt dopadne mimo herní plochu
        if (objectTop > gameArea.offsetHeight) {
            gameArea.removeChild(object);
            clearInterval(fallInterval);
            lives--;
            updateDisplay();
            if (lives <= 0) {
                endGame(false);
            }
            return;
        }

        // Kontrola kolize s košíkem
        if (
            objectRect.bottom >= basketRect.top &&
            objectRect.top <= basketRect.bottom &&
            objectRect.left <= basketRect.right &&
            objectRect.right >= basketRect.left
        ) {
            gameArea.removeChild(object);
            clearInterval(fallInterval);
            points++;
            checkLevelUp();
            updateDisplay();
            return;
        }

        // Posun objektu dolů
        object.style.top = objectTop + objectSpeed + "px";
    }, 50);
}

// Kontrola postupu do dalšího levelu
function checkLevelUp() {
    if (points >= level * 20) {
        level++;
        objectSpeed += 1; // Zvýší se rychlost
        objectInterval = Math.max(200, objectInterval * 0.9); // Zkrácení intervalu
        clearInterval(objectGenerationInterval);
        objectGenerationInterval = setInterval(createObject, objectInterval);
    }
}

// Konec hry
function endGame(isWin) {
    clearInterval(objectGenerationInterval);
    const message = isWin
        ? "Herzlichen Glückwunsch! Du hast gewonnen!"
        : "Spiel vorbei. Versuch es noch einmal.";
    alert(message);
    location.reload();
}

// Spuštění generování objektů
let objectGenerationInterval = setInterval(createObject, objectInterval);

// Inicializace hry
updateDisplay();
