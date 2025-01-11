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
        document.getElementById("message").textContent = "Zadej platné číslo v rozsahu!";
        return;
    }

    if (guess === randomNumber) {
        document.getElementById("message").textContent = "Gratulujeme! Uhodl jsi číslo.";
        clearInterval(timerInterval);
        return;
    } else if (guess < randomNumber) {
        minRange = Math.max(minRange, guess + 1);
        document.getElementById("message").textContent = "Číslo je větší!";
    } else {
        maxRange = Math.min(maxRange, guess - 1);
        document.getElementById("message").textContent = "Číslo je menší!";
    }

    attempts--;
    document.getElementById("attempts").textContent = attempts;

    if (attempts === 0) {
        document.getElementById("message").textContent = "Prohra! Došly ti pokusy.";
        clearInterval(timerInterval);
    }

    updateRangeGraph();
}

function updateRangeGraph() {
    const canvas = document.getElementById("graphCanvas");
    const ctx = canvas.getContext("2d");

    // Vyčistíme canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const unitWidth = canvas.width / 100;

    // Vybarvíme aktuální rozsah
    ctx.fillStyle = "green";
    ctx.fillRect(minRange * unitWidth, 0, (maxRange - minRange) * unitWidth, canvas.height);

    // Aktualizujeme popisky pod grafem
    document.getElementById("minLabel").textContent = `${minRange}`;
    document.getElementById("maxLabel").textContent = `${maxRange}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById("timer").textContent = timer;

        if (timer === 0) {
            document.getElementById("message").textContent = "Čas vypršel! Prohra.";
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Spustíme časovač a vykreslíme první graf
startTimer();
updateRangeGraph();
