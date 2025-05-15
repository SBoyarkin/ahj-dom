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
    newItem.addEventListener("click", (event) => {
      if (event.target.classList.contains("active-item")) {
        const active = document.querySelector(".active-item");
        if (active) {
          active.classList.remove("active-item");
        }
      }
    });
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
const item = new Item(mb);

while (mb.children.length < 16) {
  item.createItem();
}

setInterval(() => {
  item.createActiveItem();
}, 2000);
