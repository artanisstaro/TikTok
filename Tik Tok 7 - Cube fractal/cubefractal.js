//////////////////////////
// Tik Tok - eightlay   //
// Telegram - @eightlay //
//////////////////////////

var angle = 0;
var r = 150;
var boxes;

class Box {
  constructor(x, y, z, r) {
    this.pos = createVector(x, y, z);
    this.r = r;
    this.rgb = createVector(random(255), random(255), random(255));
  }
  display() {
    fill(this.rgb.x, this.rgb.y, this.rgb.z);
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    box(this.r);
    pop();
  }
}

function generate() {
  temp = [];
  r /= 3;
  boxes.forEach(function(box) {
    for (let i = -1; i < 2; i++)
      for (let j = -1; j < 2; j++)
        for (let k = -1; k < 2; k++)
          if (abs(i) + abs(j) + abs(k) > 1) {
            let b = new Box(box.pos.x - i * r,
              box.pos.y - j * r,
              box.pos.z - k * r, r);
            temp.push(b);
          }
  });
  boxes = temp;
}

function touchStarted() {
  generate();
}

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);


  boxes = [new Box(0, 0, 0, r)];
}

function draw() {
  background(31);
  rotateX(angle);
  rotateY(angle * 0.3);
  rotateZ(angle * 1.2);
  angle++;

  boxes.forEach(function(box) {
    box.display();
  });
}