export default class Block {
  _parentElement;
  divs = [];
  location = [];
  x = 0;
  y = 0;
  line = 0;
  constructor(frame) {
    this.parentFrame = frame;
  }
  // arr = `
  // 0,1,0,2,1,2,2,2;
  // 0,1,1,1,1,2,2,2;
  // 0,1,0,2,1,1,2,1;
  // 0,2,1,1,1,2,2,1;
  // 1,0,1,1,1,2,1,3;
  // 1,1,1,2,2,1,2,2;
  // 1,1,2,0,2,1,2,2`
  // .split(";");

  init(rand) {
    this.divs = [];

    let startLeft = (this.parentFrame.row - 4) / 2;
    this.x = startLeft;

    // let rand = Math.floor(Math.random() * this.parentFrame.arr.length);

    let smallarr = this.parentFrame.arr[rand].split(",");
    this.location = smallarr;

    for (let i = 0; i < 8; i += 2) {
      let smalldiv = document.createElement("div");
      smalldiv.className = "smallDiv";
      smalldiv.style.width = this.parentFrame.unit - 2 + "px";
      smalldiv.style.height = this.parentFrame.unit - 2 + "px";

      smalldiv.style.top = (smallarr[i] - 0) * this.parentFrame.unit + "px";
      smalldiv.style.left =
        (smallarr[i + 1] - 0 + startLeft) * this.parentFrame.unit + "px";

      this.divs.push(smalldiv);

      document.querySelector(".gameframe").appendChild(smalldiv);
    }
    this.automovedown = setInterval(this.autoMoveDown.bind(this), 1000);
  }

  autoMoveDown() {
    this.moveDown();
    // if (!this._canMove("down")) {
    //   clearInterval(this.automovedown);
    //   for (let div of this.divs) {
    //     div.className = "inactDiv";
    //     this.parentFrame.data[
    //       this.translate(div.style.top, div.style.left)
    //     ] = 1;
    //   }
    //   console.log(this.parentFrame.data);
    //   this.parentFrame.start();
    // }
  }

  translate(top, left) {
    return (
      (parseInt(top) / this.parentFrame.unit) * 10 +
      parseInt(left) / this.parentFrame.unit
    );
  }

  rotate() {
    // const canmoveRight = this._canMove("right");
    const canmoveDown = this._canMove("down");
    // if (!canmoveDown) return;
    if (!canmoveDown) this.y -= 1;
    // if (!canmoveRight) this.x -= 1;
    if (this.x >= 7) this.x -= 1;
    if (this.x <= -1) this.x += 1;
    for (let i = 0; i < this.divs.length; i++) {
      let reg = this.location[i * 2];
      this.location[i * 2] = this.location[i * 2 + 1];
      this.location[i * 2 + 1] = 3 - reg;

      this.divs[i].style.top =
        (this.y + parseInt(this.location[i * 2])) * this.parentFrame.unit +
        "px";
      this.divs[i].style.left =
        (this.x + parseInt(this.location[i * 2 + 1])) * this.parentFrame.unit +
        "px";
    }
  }

  moveRight() {
    const canmove = this._canMove("right");
    if (canmove) {
      for (let div of this.divs) {
        div.style.left = `${
          parseInt(div.style.left) + this.parentFrame.unit
        }px`;
      }
      this.x += 1;
    }
  }
  moveLeft() {
    const canmove = this._canMove("left");
    if (canmove) {
      for (let div of this.divs) {
        div.style.left = `${
          parseInt(div.style.left) - this.parentFrame.unit
        }px`;
      }
      this.x -= 1;
    }
  }
  moveDown() {
    const canmove = this._canMove("down");
    if (canmove) {
      for (let div of this.divs) {
        div.style.top = `${parseInt(div.style.top) + this.parentFrame.unit}px`;
      }
      this.y += 1;
    } else {
      clearInterval(this.automovedown);
      for (let div of this.divs) {
        div.className = "inactDiv";
        this.parentFrame.data[
          this.translate(div.style.top, div.style.left)
        ] = 1;
      }
      for (let i = 0; i < this.parentFrame.row; i++) {
        if (this.parentFrame.data[i] == 1) {
          alert("Game Over");
          window.location.reload();
          break;
        }
      }
      this._clearLine();
      // console.log(document.querySelectorAll(".inactDiv")[0]);
      this.parentFrame.start();
    }
  }

  _clearLine() {
    let nowy;
    for (let i = 0; i < this.parentFrame.col; i++) {
      let needClear = true;
      for (let j = 0; j < this.parentFrame.row; j++) {
        if (this.parentFrame.data[i * 10 + j] == 0) {
          needClear = false;
          break;
        }
        // nowy = i;
      }
      nowy = i;

      if (needClear) {
        for (let i = nowy; i > 0; i--) {
          for (let j = 0; j < this.parentFrame.row; j++) {
            this.parentFrame.data[i * 10 + j] =
              this.parentFrame.data[(i - 1) * 10 + j];
          }
        }
        console.log(i);
        console.log(this.parentFrame.data);
        const inact = document.querySelectorAll(".inactDiv");
        for (let i = 0; i < inact.length; i++) {
          // console.log("inact", inact[i].style.top);
          // console.log("unit", nowy * this.parentFrame.unit);
          if (parseInt(inact[i].style.top) == nowy * this.parentFrame.unit) {
            inact[i].parentNode.removeChild(inact[i]);
          }
          if (parseInt(inact[i].style.top) < nowy * this.parentFrame.unit) {
            inact[i].style.top =
              parseInt(inact[i].style.top) + this.parentFrame.unit + "px";
          }
        }
        this.parentFrame.score += 10;
        const score = document.querySelector(".score");
        score.innerHTML = "";
        score.innerHTML = this.parentFrame.score;
      }
    }
  }

  _canMove(move) {
    switch (move) {
      case "right":
        for (let div of this.divs) {
          if (
            parseInt(div.style.left) + this.parentFrame.unit >=
              parseInt(this.parentFrame.width) ||
            this.parentFrame.data[
              this.translate(div.style.top, div.style.left) + 1
            ] == 1
          )
            return false;
        }
        return true;

      case "left":
        for (let div of this.divs) {
          if (
            parseInt(div.style.left) <= 0 ||
            this.parentFrame.data[
              this.translate(div.style.top, div.style.left) + -1
            ] == 1
          )
            return false;
        }
        return true;
      case "down":
        for (let div of this.divs) {
          if (
            parseInt(div.style.top) + this.parentFrame.unit >=
              parseInt(this.parentFrame.height) ||
            this.parentFrame.data[
              this.translate(div.style.top, div.style.left) + 10
            ] == 1
          )
            return false;
        }
        return true;
    }
  }
}
