var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
var painting = false;
var lastPoint = { x: undefined, y: undefined };

var eraser = document.querySelector("#eraser");
var enableEraser = false;

canvas.addEventListener("mousedown", e => {
  painting = true;
  let x = e.clientX;
  let y = e.clientY;
  lastPoint = { x, y };
});
canvas.addEventListener("mousemove", e => {
  if (!painting) return;
  let x = e.clientX;
  let y = e.clientY;

  if (enableEraser) {
    context.clearRect(x, y, 5, 5);
    return;
  }

  let newPoint = { x, y };
  drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
  lastPoint = newPoint;
});
canvas.addEventListener("mouseup", e => {
  painting = false;
});

eraser.addEventListener("click", () => {
  enableEraser = true;
});

function drawCircle(x, y) {
  context.beginPath();
  context.arc(x, y, 1, 0, Math.PI * 2);
  context.fill();
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.lineWidth = 10;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

function setupRect() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

{
  setupRect();
  window.onresize = function() {
    setupRect();
  };
}
