export function startDodge(container) {

    container.innerHTML = `
        <h2>💔 Desvie das Bombas!</h2>
        <div id="score">Pontos: 0</div>

        <div id="dodge-area"></div>

        <button id="restart-dodge" class="restart-btn">Reiniciar</button>
    `;

    const area = container.querySelector("#dodge-area");
    const scoreEl = container.querySelector("#score");
    const restartBtn = container.querySelector("#restart-dodge");

    area.style.width = "90%";
    area.style.height = "400px";
    area.style.margin = "20px auto";
    area.style.background = "white";
    area.style.borderRadius = "15px";
    area.style.position = "relative";
    area.style.overflow = "hidden";
    area.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.2)";
    area.style.touchAction = "none";

    let score = 0;
    let gameOver = false;
    let obstacles = [];
    let player;
    let spawnInterval = null;

    function setup() {
        area.innerHTML = "";
        obstacles = [];
        gameOver = false;
        score = 0;

        scoreEl.textContent = "Pontos: 0";

        if (spawnInterval !== null) {
            clearInterval(spawnInterval);
        }

        // PLAYER (PNG)
        player = document.createElement("img");
        player.src = "./puzzle-web/src/img/heart.png";
        player.style.width = "50px";
        player.style.position = "absolute";
        player.style.bottom = "20px";
        player.style.left = "50%";
        player.style.transform = "translateX(-50%)";
        player.style.transition = "0.05s";

        area.appendChild(player);

        // Spawn de bombas
        spawnInterval = setInterval(spawnBomb, 800);
    }

    function spawnBomb() {
        if (gameOver) return;

        const bomb = document.createElement("img");
        bomb.src = "./puzzle-web/src/img/bomb.png";
        bomb.style.width = "40px";
        bomb.style.position = "absolute";

        bomb.x = Math.random() * (area.clientWidth - 40);
        bomb.y = -50;

        bomb.style.left = bomb.x + "px";
        bomb.style.top = bomb.y + "px";

        bomb.speed = 3 + Math.random() * 2;

        obstacles.push(bomb);
        area.appendChild(bomb);
    }

    function movePlayer(e) {
        if (gameOver) return;

        const rect = area.getBoundingClientRect();
        let x = e.clientX - rect.left;

        if (x < 20) x = 20;
        if (x > rect.width - 20) x = rect.width - 20;

        player.style.left = x + "px";
    }

    area.addEventListener("mousemove", movePlayer);

    area.addEventListener("touchmove", e => {
        movePlayer({ clientX: e.touches[0].clientX });
    });

    function update() {
        if (!gameOver) {
            for (let i = obstacles.length - 1; i >= 0; i--) {
                const b = obstacles[i];

                b.y += b.speed;
                b.style.top = b.y + "px";

                const p = player.getBoundingClientRect();
                const o = b.getBoundingClientRect();
                const a = area.getBoundingClientRect();

                // colisão
                if (
                    o.left < p.right &&
                    o.right > p.left &&
                    o.top < p.bottom &&
                    o.bottom > p.top
                ) {
                    gameOver = true;
                    scoreEl.textContent = "💥 Game Over — Pontos: " + score;
                    continue;
                }

                // bomba passou
                if (b.y > area.clientHeight) {
                    b.remove();
                    obstacles.splice(i, 1);

                    score++;
                    scoreEl.textContent = "Pontos: " + score;
                }
            }
        }

        requestAnimationFrame(update);
    }

    restartBtn.addEventListener("click", setup);

    setup();
    update();
}
