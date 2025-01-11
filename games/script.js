// Funkce pro otevření konkrétní záložky
function openTab(gameId) {
    // Skryje všechny herní sekce
    var games = document.querySelectorAll('.tab-content');
    games.forEach(function(game) {
        game.style.display = 'none';
    });

    // Zobrazí vybraný obsah
    var selectedGame = document.getElementById(gameId);
    selectedGame.style.display = 'block';
}

// Spustí se při načtení stránky
window.onload = function() {
    // Po načtení stránky všechny sekce zůstávají skryté
    var games = document.querySelectorAll('.tab-content');
    games.forEach(function(game) {
        game.style.display = 'none';
    });
};
