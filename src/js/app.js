class Item {
  constructor(tag) {
    this.board = tag;
  }

  createItem() {
    const newIntem = document.createElement("div");
    newIntem.classList.add("items");
    newIntem.dataset.id = this.board.children.length + 1;
    this.board.append(newIntem);
    newIntem.addEventListener("click", (event) => {
      if (event.target.classList.contains("active-item")) {
        this.removeActiveItem();
      }
    });
  }

  createActiveItem() {
    const position = Math.floor(
      this._getRandomNumber(0, this.board.children.length),
    );
    const items = document.querySelectorAll(".items");
    items[position].classList.add("active-item");
    console.log(position);
  }

  removeActiveItem(event) {
    event = document.querySelector(".active-item");
    if (event) {
      event.classList.remove("active-item");
    }
  }

  _getRandomNumber(min, max) {
    const pos = Math.random() * (max - min) + min;
    console.log(pos)
    return pos;
  }
}

const mb = document.querySelector(".board");
console.log(mb);
const item = new Item(mb);

while (mb.children.length < 16) {
  item.createItem();
}

setInterval(() => {
  item.removeActiveItem(), item.createActiveItem();
}, 1000);
