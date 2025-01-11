let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;
let score = 0;
let minRange = 1;
let maxRange = 100;
let timer = 60;
let timerInterval;

document.getElementById("check").addEventListener("click", checkGuess);

function checkGuess() {
    const guess = parseInt(document.getElementById("guess").value);

    if (isNaN(guess) || guess < minRange || guess > maxRange) {
        document.getElementById("message").textContent = "Gib eine gültige Zahl im Bereich ein!";
        return;
    }

    if (guess === randomNumber) {
        document.getElementById("message").textContent = "Herzlichen Glückwunsch! Du hast die Zahl erraten.";
        clearInterval(timerInterval);
        return;
    } else if (guess < randomNumber) {
        minRange = Math.max(minRange, guess + 1);
        document.getElementById("message").textContent = "Die Zahl ist größer!";
    } else {
        maxRange = Math.min(maxRange, guess - 1);
        document.getElementById("message").textContent = "Die Zahl ist kleiner!";
    }

    attempts--;
    document.getElementById("attempts").textContent = attempts;

    if (attempts === 0) {
        document.getElementById("message").textContent = "Verloren! Du hast keine Versuche mehr.";
        clearInterval(timerInterval);
    }

    updateRangeGraph();
}

function updateRangeGraph() {
    const canvas = document.getElementById("graphCanvas");
    const ctx = canvas.getContext("2d");

    // Canvas leeren
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const unitWidth = canvas.width / 100;

    // Aktuellen Bereich einfärben
    ctx.fillStyle = "green";
    ctx.fillRect(minRange * unitWidth, 0, (maxRange - minRange) * unitWidth, canvas.height);

    // Beschriftungen unter dem Diagramm aktualisieren
    document.getElementById("minLabel").textContent = `${minRange}`;
    document.getElementById("maxLabel").textContent = `${maxRange}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById("timer").textContent = timer;

        if (timer === 0) {
            document.getElementById("message").textContent = "Die Zeit ist abgelaufen! Du hast verloren.";
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Timer starten und das erste Diagramm zeichnen
startTimer();
updateRangeGraph();
