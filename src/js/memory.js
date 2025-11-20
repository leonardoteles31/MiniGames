export function startMemory(container) {

    container.innerHTML = `
        <h2>🧠 Memory Love</h2>

        <div id="memory-board" 
            style="
                width: 320px;
                height: auto;
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
                margin: 20px auto;
            ">
        </div>

        <button id="restart-memory"
            style="
                padding: 10px 20px;
                background:#ff4f75;
                color:white;
                border:none;
                border-radius:10px;
                cursor:pointer;
                font-size:18px;
                margin-top:10px;
            ">
            Reiniciar
        </button>

        <div id="memory-message"
            style="
                margin-top:20px;
                font-size:24px;
                font-weight:bold;
                color:#d4005e;
                display:none;
            ">
        </div>
    `;

    const board = container.querySelector("#memory-board");
    const restartBtn = container.querySelector("#restart-memory");
    const msgEl = container.querySelector("#memory-message");

    function showMessage(text, color = "#d4005e") {
        msgEl.textContent = text;
        msgEl.style.color = color;
        msgEl.style.display = "block";
    }

    let cards = ["❤️","💖","💘","💝","💗","💕","💞","💓"];
    let flipped = [];
    let matched = 0;

    function setup() {
        board.innerHTML = "";
        msgEl.style.display = "none";
        flipped = [];
        matched = 0;

        let deck = [...cards, ...cards].sort(() => Math.random() - 0.5);

        deck.forEach(symbol => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.symbol = symbol;

            card.style.width = "100%";
            card.style.height = "70px";
            card.style.background = "white";
            card.style.borderRadius = "10px";
            card.style.display = "flex";
            card.style.justifyContent = "center";
            card.style.alignItems = "center";
            card.style.fontSize = "30px";
            card.style.cursor = "pointer";
            card.style.boxShadow = "0px 3px 6px rgba(0,0,0,0.2)";
            card.style.transition = "0.2s";

            card.textContent = "";

            board.appendChild(card);
            card.addEventListener("click", () => flip(card));
        });
    }


    function flip(card) {
        if (card.classList.contains("flipped")) return;
        if (flipped.length === 2) return;

        card.classList.add("flipped");
        card.style.background = "#ffbad2";
        card.textContent = card.dataset.symbol;

        flipped.push(card);
        if (flipped.length === 2) {
            setTimeout(check, 600);
        }
    }

    function check() {
        const [c1, c2] = flipped;

        if (c1.dataset.symbol === c2.dataset.symbol) {
            matched += 2;

            if (matched === cards.length * 2) {
                setTimeout(() => {
                    showMessage("🎉 Olha só, a memória de elefante ta boaKKKKK Te amo!! ❤️", "#e60073");
                }, 300);
            }
        } else {
            c1.classList.remove("flipped");
            c1.textContent = "";
            c1.style.background = "white";

            c2.classList.remove("flipped");
            c2.textContent = "";
            c2.style.background = "white";
        }
        flipped = [];
    }

    restartBtn.addEventListener("click", setup);

    setup();
}
