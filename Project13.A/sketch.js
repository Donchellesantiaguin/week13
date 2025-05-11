let bolts = [];
let flashAlpha = 0;

function setup() {
  createCanvas(600, 600);
  stroke(255);
  frameRate(60);
}

function draw() {
  background(0, 20);

  // Flash effect when lightning strikes attemption
  if (random(1) < 0.01) {
    bolts.push(new Lightning(random(width)));
    flashAlpha = 100;
  }

  // Wannabe lightning bolts
  for (let i = bolts.length - 1; i >= 0; i--) {
    bolts[i].update();
    bolts[i].display();
    if (bolts[i].done) bolts.splice(i, 1);
  }

  // Trying flash
  if (flashAlpha > 0) {
    fill(255, flashAlpha);
    rect(0, 0, width, height);
    flashAlpha -= 5;
  }
}

// Lightning bolt class
class Lightning {
  constructor(x) {
    this.x = x;
    this.y = 0;
    this.segments = [];
    this.done = false;

    this.generateBolt();
  }

  generateBolt() {
    let x = this.x;
    let y = this.y;

    while (y < height) {
      let xOffset = random(-15, 15);
      let yStep = random(10, 20);
      this.segments.push({ x, y });
      x += xOffset;
      y += yStep;
    }
  }

  update() {

    if (random(1) < 0.005) this.done = true;
  }

  display() {
    strokeWeight(2);
    stroke(255, 255, 255);
    for (let i = 0; i < this.segments.length - 1; i++) {
      let a = this.segments[i];
      let b = this.segments[i + 1];
      line(a.x, a.y, b.x, b.y);
    }
  }
}