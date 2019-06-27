var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
var painting = false;
var lastPoint = { x: undefined, y: undefined };

var eraser = document.querySelector("#eraser");
var enableEraser = false;

var brush = document.querySelector("#brush");
var clear = document.querySelector("#clear");
var download = document.querySelector("#save");

var black = document.querySelector("#black");
var green = document.querySelector("#green");
var blue = document.querySelector("#blue");

var thin = document.querySelector("#thin");
var thick = document.querySelector("#thick");

initCanvas();
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

// setup
function initCanvas() {
  context.lineWidth = 5;
  context.fillStyle = "green";
  console.log("w:", canvas.width);
  console.log("h:", canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);
  console.log("c:", context);
}

// Actions
eraser.addEventListener("click", () => {
  enableEraser = true;
  eraser.classList.add("active");
  brush.classList.remove("active");
});
brush.addEventListener("click", () => {
  enableEraser = false;
  brush.classList.add("active");
  eraser.classList.remove("active");
});
clear.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});
download.addEventListener("click", () => {
  var image = canvas.toDataURL();
  var aLink = document.createElement("a");
  aLink.download = "我的作品.png";
  aLink.href = image;
  aLink.click();
});

black.addEventListener("click", () => {
  resetColors();
  black.classList.add("active");
  context.strokeStyle = "black";
});
green.addEventListener("click", () => {
  resetColors();
  green.classList.add("active");
  context.strokeStyle = "green";
});
blue.addEventListener("click", () => {
  resetColors();
  blue.classList.add("active");
  context.strokeStyle = "blue";
});

thin.addEventListener("click", () => {
  context.lineWidth = 5;
});
thick.addEventListener("click", () => {
  context.lineWidth = 10;
});

// Helper

function drawCircle(x, y) {
  context.beginPath();
  context.arc(x, y, 1, 0, Math.PI * 2);
  context.fill();
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
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

function resetColors() {
  [black, green, blue].forEach(color => {
    color.classList.remove("active");
  });
}

// resize
{
  setupRect();
  window.onresize = function() {
    setupRect();
  };
}
