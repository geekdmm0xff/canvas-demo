{
  const canvas = document.querySelector("#canvas");
  let painting = false;
  canvas.addEventListener("mousedown", e => {
    painting = true;

    let d = document.createElement("div");
    let style =
      "width: 5px; height:6px; background: black; position: absolute;";
    style += "left:" + e.clientX + "px;";
    style += "top:" + e.clientY + "px;";
    d.style = style;
    canvas.appendChild(d);
  });
  canvas.addEventListener("mousemove", e => {
    if (!painting) return;
    let d = document.createElement("div");
    let style =
      "width: 5px; height:6px; background: black; position: absolute;";
    style += "left:" + e.clientX + "px;";
    style += "top:" + e.clientY + "px;";
    d.style = style;
    canvas.appendChild(d);
  });

  canvas.addEventListener("mouseup", e => {
    painting = false;
  });
}
