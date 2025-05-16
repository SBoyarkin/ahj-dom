class Item {
  constructor(tag) {
    this.board = tag;
    this.lastActiveIndex = -1;
  }

  createItem() {
    const newItem = document.createElement("div");
    newItem.classList.add("items");
    newItem.dataset.id = this.board.children.length + 1;
    this.board.append(newItem);
  }

  createActiveItem() {
    const items = document.querySelectorAll(".items");
    if (items.length === 0) return false;

    let newPosition;
    do {
      newPosition = Math.floor(this._getRandomNumber(0, items.length));
    } while (newPosition === this.lastActiveIndex && items.length > 1);

    const active = document.querySelector(".active-item");
    let wasMissed = false;

    if (active) {
      active.classList.remove("active-item");
      wasMissed = true;
    }

    items[newPosition].classList.add("active-item");
    this.lastActiveIndex = newPosition;

    return wasMissed;
  }

  _getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
}

class GameCounter {
  constructor(maxMisses = 5) {
    this.hits = 0;
    this.misses = 0;
    this.maxMisses = maxMisses;
    this.gameActive = true;
    this.createCounterUI();
  }

  createCounterUI() {
    this.counterElement = document.createElement("div");
    this.counterElement.className = "game-counter";
    this.counterElement.innerHTML = `
      <div>Попаданий: <span class="hits">0</span></div>
      <div>Пропущено: <span class="misses">0</span>/${this.maxMisses}</div>
    `;
    document.body.insertBefore(this.counterElement, document.body.firstChild);
  }

  incrementHit() {
    if (!this.gameActive) return;
    this.hits++;
    this.misses = 0;
    this.updateUI();
  }

  incrementMiss() {
    if (!this.gameActive) return;
    this.misses++;
    this.updateUI();

    if (this.misses >= this.maxMisses) {
      this.endGame();
    }
  }

  updateUI() {
    this.counterElement.querySelector(".hits").textContent = this.hits;
    this.counterElement.querySelector(".misses").textContent = this.misses;
  }

  endGame() {
    this.gameActive = false;
    const gameOverMsg = document.createElement("div");
    gameOverMsg.className = "game-over";
    gameOverMsg.textContent = `Игра окончена! Счет: ${this.hits}`;
    this.counterElement.appendChild(gameOverMsg);
  }
}

const mb = document.querySelector(".board");
const item = new Item(mb);
const counter = new GameCounter();

while (mb.children.length < 16) {
  item.createItem();
}

mb.addEventListener("click", (event) => {
  if (event.target.classList.contains("active-item")) {
    event.target.classList.remove("active-item");
    counter.incrementHit();
  }
});

const gameInterval = setInterval(() => {
  if (!counter.gameActive) {
    clearInterval(gameInterval);
    return;
  }

  const wasMissed = item.createActiveItem();
  if (wasMissed) {
    counter.incrementMiss();
  }
}, 1000);
