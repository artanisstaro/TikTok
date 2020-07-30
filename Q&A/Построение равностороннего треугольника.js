var r = 250;
var phi = 60;
var counter1 = 0;
var counter2 = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  strokeWeight(8);
}

function draw() {
  background(31);
  translate(width / 4, height * 0.75);
  stroke(255);
  line(0, 0, r, 0);
  let x = r * cos(counter1);
  let y = r * -sin(counter1);
  line(0, 0, x, y);
  counter1 = constrain(counter1 + 0.5, 0, phi);
  if (counter1 == phi) {
    stroke(255,0,105);
    let aim = createVector(r - x, -y).setMag(counter2);
    line(x, y, x + aim.x, y + aim.y);
    counter2 = constrain(counter2 + 1, 0, 250)
  }
}