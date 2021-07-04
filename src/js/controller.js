import GameFrame from "./views/gameframeView.js";

let frame;

function initialGame() {
  frame = new GameFrame(40, 10, 20);

  document.body.addEventListener("keydown", Move);
}
initialGame();

function Move() {
  switch (event.keyCode) {
    case 38:
      frame.rotate();
      break;
    case 37:
      frame.moveLeft();
      break;
    case 39:
      frame.moveRight();
      break;
    case 40:
      frame.moveDown();
      break;
  }
}
