import Block from "./blockView.js";

export default class GameFrame {
  _parentElement = document.querySelector(".gameframe");
  data = [];
  score = 0;
  now; // now block
  next; // next block
  first = true;
  arr = `
    0,1,0,2,1,2,2,2;0,1,1,1,1,2,2,2;
    0,1,0,2,1,1,2,1;0,2,1,1,1,2,2,1;
    1,0,1,1,1,2,1,3;1,1,1,2,2,1,2,2;
    1,1,2,0,2,1,2,2`.split(";");
  constructor(unit, row, col) {
    this.row = row;
    this.col = col;
    this.unit = unit;
    this._init();
  }

  render() {}

  _init() {
    this._parentElement.style.width = this.row * this.unit + "px";
    this.width = this._parentElement.style.width;
    this._parentElement.style.height = this.col * this.unit + "px";
    this.height = this._parentElement.style.height;

    for (let i = 0; i < this.col; i++) {
      for (let j = 0; j < this.row; j++) {
        const div = document.createElement("div");
        div.className = "gameblock";
        div.style.width = this.unit - 2 + "px";
        div.style.height = this.unit - 2 + "px";
        div.style.left = j * this.unit + "px";
        div.style.top = i * this.unit + "px";
        this._parentElement.appendChild(div);
        this.data.push(0);
      }
    }
    // console.log(this.data);
    this.next = Math.floor(Math.random() * this.arr.length);
    this.start();
    // this.createBlock();
    // console.log(this.data);
    // console.log(this.data[(1, 2)]);
  }

  start() {
    this.now = this.next;
    // console.log("12");
    this.block = new Block(this);
    this.block.init(this.now);

    this.next = Math.floor(Math.random() * this.arr.length);
    this.draw();
    // this.interval = setInterval(autoMoveDown, 1000);
  }

  draw() {
    if (this.first) {
      const frame = document.querySelector(".draw_next");
      frame.style.width = 4 * this.unit + "px";
      frame.style.height = 4 * this.unit + "px";
      // console.log(frame);
    }
    this.first = false;
    const draw_next = document.querySelector(".draw_next");
    console.log(draw_next);
    draw_next.innerHTML = "";
    for (let i = 0; i < 8; i += 2) {
      let smalldiv = document.createElement("div");

      let smallarr = this.arr[this.next].split(",");

      smalldiv.className = "smallDiv";
      smalldiv.style.width = this.unit - 2 + "px";
      smalldiv.style.height = this.unit - 2 + "px";

      smalldiv.style.top = (smallarr[i] - 0) * this.unit + "px";
      smalldiv.style.left = (smallarr[i + 1] - 0) * this.unit + "px";

      draw_next.appendChild(smalldiv);
    }
  }

  moveLeft() {
    this.block.moveLeft();
  }
  moveRight() {
    this.block.moveRight();
  }
  moveDown() {
    this.block.moveDown();
  }

  rotate() {
    this.block.rotate();
  }
}
