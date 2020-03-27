let c;
let pg;
const brushW = 8;

function setup() {
  c = createCanvas(100, 100);
  pg = createGraphics(width, height);
  pg.noStroke();

  let lat, lon;

  const button = document.getElementById("submit");
  button.addEventListener("click", async event => {
    const mood = document.getElementById("mood").value;
    c.loadPixels();
    const image64 = c.canvas.toDataURL();
    const data = { lat, lon, mood, image64 };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    const response = await fetch("/api", options);
    const json = await response.json();
    console.log(json);
  });
}

function draw() {
  background(220);
  if (mouseIsPressed) {
    pg.ellipse(mouseX, mouseY, brushW, brushW);
  }
  image(pg, 0, 0, width, height);
}
