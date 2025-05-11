let radiusSlider, freqSlider, speedSlider;
let angleOffset = 0;
let hueShift = 0;
let bloomLayers = [];

// Inspired by our class readings: "Transitional Interfaces" & "Making Material Design"
// Using sin() for soft, organic transitions and pulsing motions

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(RADIANS);
  noFill();

  radiusSlider = select('#radiusSlider');
  freqSlider = select('#freqSlider');
  speedSlider = select('#speedSlider');

  // Creating multiple bloom layers (OOP)
  for (let i = 0; i < 20; i++) {
    bloomLayers.push(new BloomLayer(i));
  }
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  let radius = radiusSlider.value();
  let frequency = freqSlider.value();
  let speed = map(speedSlider.value(), 1, 5, 0.002, 0.05);

  for (let layer of bloomLayers) {
    layer.display(radius, frequency, speed);
  }

  angleOffset += speed;
  hueShift += 1;
}

// Object-Oriented Bloom Layers
class BloomLayer {
  constructor(index) {
    this.index = index;
  }

  display(radius, frequency, speed) {
    let offset = angleOffset + this.index * 0.05;
    let rMult = sin(offset * 0.5) * 0.5 + 1;
    let r = radius * rMult;
    let hue = (hueShift + this.index * 15) % 360;

    stroke(hue, 100, 100, 20);
    strokeWeight(0.5);

    beginShape();
    for (let a = 0; a < TWO_PI * frequency; a += 0.02) {
      let rad = r * sin(a + offset);
      let x = rad * cos(a);
      let y = rad * sin(a);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}