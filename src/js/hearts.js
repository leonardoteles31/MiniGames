export function startHearts(container) {

    container.innerHTML = `
        <h2>❤️ Click Lover</h2>

        <div id="hearts-timer" style="font-size:22px; margin-bottom:10px;">
            ⏳ Tempo: 10
        </div>

        <div id="hearts-area"></div>

        <button id="hearts-restart"
            style="
                padding: 10px 20px;
                background:#ff4f75;
                color:white;
                border:none;
                border-radius:10px;
                cursor:pointer;
                font-size:18px;
                margin-top:15px;
            ">
            Reiniciar
        </button>

        <div id="hearts-message" 
            style="
                margin-top:20px;
                font-size:24px;
                font-weight:bold;
                color:#d4005e;
                display:none;
            ">
        </div>
    `;

    const timerEl = container.querySelector("#hearts-timer");
    const msgEl = container.querySelector("#hearts-message");
    const restartBtn = container.querySelector("#hearts-restart");
    const area = container.querySelector("#hearts-area");

    area.style.width = "90%";
    area.style.height = "300px";
    area.style.margin = "20px auto";
    area.style.background = "white";
    area.style.borderRadius = "20px";
    area.style.position = "relative";
    area.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.2)";
    area.style.overflow = "hidden";

    let totalHearts = 10;
    let collected = 0;
    let time = 10;
    let ended = false;
    let timer = null;

    function showMessage(text, color = "#d4005e") {
        msgEl.textContent = text;
        msgEl.style.color = color;
        msgEl.style.display = "block";
    }

    function startTimer() {
        timer = setInterval(() => {
            if (ended) return;

            time--;
            timerEl.textContent = `⏳ Tempo: ${time}`;

            if (time <= 0) {
                ended = true;
                clearInterval(timer);
                showMessage("💔 O tempo acabou!", "red");
            }
        }, 1000);
    }

    function spawnHeart() {
        const heart = document.createElement("div");
        heart.textContent = "❤️";
        heart.style.position = "absolute";
        heart.style.fontSize = "32px";

        const w = area.clientWidth;
        const h = area.clientHeight;

        const margin = 35;
        const x = Math.random() * (w - margin * 2) + margin;
        const y = Math.random() * (h - margin * 2) + margin;

        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        area.appendChild(heart);

        heart.addEventListener("click", () => {
            if (ended) return;

            heart.remove();
            collected++;

            if (collected === totalHearts) {
                ended = true;
                clearInterval(timer);
                showMessage("🎉 Parabéns meu bem, você pegou todos os corações! Te amo ❤️", "#e60073");
            }
        });
    }

    function setup() {
        area.innerHTML = "";
        msgEl.style.display = "none";

        collected = 0;
        ended = false;
        time = 10;

        timerEl.textContent = `⏳ Tempo: ${time}`;

        clearInterval(timer);
        startTimer();

        for (let i = 0; i < totalHearts; i++) spawnHeart();
    }

    restartBtn.addEventListener("click", setup);

    setup();
}
