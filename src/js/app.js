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
    if (items.length === 0) return;

    let newPosition;
    do {
      newPosition = Math.floor(this._getRandomNumber(0, items.length));
    } while (newPosition === this.lastActiveIndex && items.length > 1);

    const active = document.querySelector(".active-item");
    if (active) {
      active.classList.remove("active-item");
    }

    items[newPosition].classList.add("active-item");
    this.lastActiveIndex = newPosition;
  }

  _getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
}

const mb = document.querySelector(".board");
mb.addEventListener("click", (event) => {
  if (event.target.classList.contains("active-item")) {
    event.target.classList.remove("active-item");
  }
});
const item = new Item(mb);

while (mb.children.length < 16) {
  item.createItem();
}

class Counter {
  constructor(initialCount, gameOverCount) {
    this.initialCount = initialCount;
    this.gameOverCount = gameOverCount;
  }
}

setInterval(() => {
  item.createActiveItem();
}, 1000);
