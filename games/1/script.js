// Inicializace proměnných
let score = 0;
let attempts = 10;
let randomNumber = Math.floor(Math.random() * 100) + 1;
let timer;

// Funkce pro kontrolu čísla
document.getElementById("check").addEventListener("click", function() {
    const guess = document.getElementById("guess").value;
    const message = document.getElementById("message");
    const icon = document.getElementById("icon");

    // Kontrola, zda je zadané číslo v rozsahu
    if (guess < 1 || guess > 100 || isNaN(guess)) {
        message.textContent = "Zadejte číslo v rozmezí 1 až 100!";
        message.style.color = "red";
        return;
    }

    // Snížení počtu pokusů
    attempts--;
    document.getElementById("attempts").textContent = attempts;

    if (guess == randomNumber) {
        message.textContent = "Správně!";
        message.style.color = "green";
        icon.innerHTML = "👍"; // Zobrazí palec nahoru
        score++;
        document.getElementById("score").textContent = score;
        clearInterval(timer); // Zastaví časovač, pokud je hra vyhraná
        disableInput();
    } else {
        message.textContent = guess > randomNumber ? "Příliš vysoké!" : "Příliš nízké!";
        message.style.color = "red";
    }

    // Konec hry, pokud nejsou žádné pokusy
    if (attempts == 0) {
        message.textContent = "Prohráli jste! Číslo bylo " + randomNumber;
        message.style.color = "red";
        icon.innerHTML = "😞"; // Smutný obličej
        clearInterval(timer);
        disableInput();
    }
});

// Funkce pro deaktivaci vstupu po ukončení hry
function disableInput() {
    document.getElementById("guess").disabled = true;
    document.getElementById("check").disabled = true;
}

// Funkce pro restartování hry
function restartGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 10;
    score = 0;
    document.getElementById("attempts").textContent = attempts;
    document.getElementById("score").textContent = score;
    document.getElementById("message").textContent = "";
    document.getElementById("icon").innerHTML = "";
    document.getElementById("guess").disabled = false;
    document.getElementById("check").disabled = false;
    document.getElementById("guess").value = "";
    startTimer(); // Spustí nový odpočet
}

// Funkce pro spuštění odpočtu
function startTimer() {
    let timeLeft = 30; // Čas na hru je 30 sekund
    document.getElementById("message").textContent = "Zbývá čas: " + timeLeft + " sekund";
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("message").textContent = "Zbývá čas: " + timeLeft + " sekund";
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("message").textContent = "Čas vypršel! Číslo bylo " + randomNumber;
            document.getElementById("icon").innerHTML = "😞"; // Smutný obličej
            disableInput();
        }
    }, 1000);
}

// Spuštění odpočtu při načtení stránky
startTimer();