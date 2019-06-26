var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
var painting = false;
var lastPoint = { x: undefined, y: undefined };

var eraser = document.querySelector("#eraser");
var enableEraser = false;

var brush = document.querySelector("#brush");

hasTouch() ? listenTouch() : listenMouse();

// listen mouse
function listenMouse() {
  canvas.addEventListener("mousedown", e => {
    console.log("mouse down");
    painting = true;
    let x = e.clientX;
    let y = e.clientY;
    lastPoint = { x, y };
  });
  canvas.addEventListener("mousemove", e => {
    console.log("mouse move");
    if (!painting) return;
    let x = e.clientX;
    let y = e.clientY;

    if (enableEraser) {
      context.clearRect(x, y, 20, 20);
      return;
    }

    let newPoint = { x, y };
    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
    lastPoint = newPoint;
  });
  canvas.addEventListener("mouseup", e => {
    console.log("mouse up");
    painting = false;
  });
}

// listen touch
function listenTouch() {
  canvas.addEventListener("touchstart", e => {
    painting = true;
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    lastPoint = { x, y };
  });
  canvas.addEventListener("touchmove", e => {
    if (!painting) return;
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;

    if (enableEraser) {
      context.clearRect(x, y, 20, 20);
      return;
    }

    let newPoint = { x, y };
    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
    lastPoint = newPoint;
  });
  canvas.addEventListener("touchend", e => {
    painting = false;
  });
}

// Actions
eraser.addEventListener("click", () => {
  enableEraser = true;
});

brush.addEventListener("click", () => {
  enableEraser = false;
});

// Helper

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

function hasTouch() {
  return "ontouchstart" in window;
}

// resize
{
  setupRect();
  window.onresize = function() {
    setupRect();
  };
}
