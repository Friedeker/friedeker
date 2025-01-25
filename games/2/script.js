const basket = document.getElementById("basket");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("points");
const levelDisplay = document.getElementById("level");
const livesDisplay = document.getElementById("lives");
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");

let points = 0;
let level = 1;
let lives = 10;
let objectSpeed = 4; // Počáteční rychlost objektů
let objectInterval = 1000; // Počáteční interval generování objektů

// Aktualizace zobrazení skóre, levelu a životů
function updateDisplay() {
    scoreDisplay.textContent = `Skóre: ${points}`;
    levelDisplay.textContent = `Level: ${level}`;
    livesDisplay.textContent = `Životy: ${lives}`;
}

// Pohyb košíku
function moveBasket(direction) {
    const basketPosition = basket.offsetLeft;
    const basketWidth = basket.offsetWidth;
    const gameAreaWidth = gameArea.offsetWidth;

    if (direction === "left" && basketPosition > 0) {
        basket.style.left = basketPosition - 50 + "px"; // Posun vlevo
    } else if (direction === "right" && basketPosition + basketWidth < gameAreaWidth) {
        basket.style.left = basketPosition + 50 + "px"; // Posun vpravo
    }
}

// Pohyb košíku pomocí klávesnice
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        moveBasket("left");
    } else if (event.key === "ArrowRight") {
        moveBasket("right");
    }
});

// Pohyb košíku pomocí tlačítek
leftButton.addEventListener("click", () => moveBasket("left"));
leftButton.addEventListener("touchstart", () => moveBasket("left")); // Podpora pro dotyková zařízení

rightButton.addEventListener("click", () => moveBasket("right"));
rightButton.addEventListener("touchstart", () => moveBasket("right")); // Podpora pro dotyková zařízení


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
        objectSpeed += 1; // Zvýšení rychlosti
        objectInterval = Math.max(200, objectInterval * 0.9); // Zkrácení intervalu generování
        clearInterval(objectGenerationInterval);
        objectGenerationInterval = setInterval(createObject, objectInterval);
    }
}

// Konec hry
function endGame(isWin) {
    clearInterval(objectGenerationInterval);
    const message = isWin ? "Gratulace! Vyhrál jsi!" : "Konec hry. Zkus to znovu.";
    alert(message);
    location.reload();
}

// Spuštění generování objektů
let objectGenerationInterval = setInterval(createObject, objectInterval);

// Inicializace hry
updateDisplay();
