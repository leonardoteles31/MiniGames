const gameContainer = document.getElementById("game-container");
const menuButtons = document.querySelectorAll(".menu-btn");

// limpa a área do jogo
function clearGame() {
    gameContainer.innerHTML = "";
}

// carrega cada minigame
function loadGame(game) {
    clearGame();

    switch (game) {
        case "memory":
            import('/puzzle-web/src/js/memory.js').then(module => {
                module.startMemory(gameContainer);
            });
            break;

        case "hearts":
            import('/puzzle-web/src/js/hearts.js').then(module => {
                module.startHearts(gameContainer);
            });
            break;

        case "dodge":
            import('puzzle-web/index.html').then(module => {
            module.startDodge(gameContainer);
            });
            break;

    }
}

menuButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const game = btn.dataset.game;
        loadGame(game);
    });
});