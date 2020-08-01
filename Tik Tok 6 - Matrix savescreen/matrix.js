var letterSize = 14;
var fade = 1.6;
var hl;
var streams = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(letterSize);
  textFont('Consolas');
  hl = height + letterSize;
    
  for (let i = 0; i < width / letterSize; i++) {
    streams.push(new Stream());
    streams[i].generate(letterSize * i);
  }
}

function draw() {
  background(0, 150);

  streams.forEach(function(stream) {
    stream.display();
  });
}

class Letter {
  constructor(x, y, speed, opacity) {
    this.x = x;
    this.y = y;
    this.value = '';
    this.speed = speed;
    this.interval = round(random(5, 20));
    this.first = false;
    this.opacity = opacity;
  }

  change() {
    if (frameCount % this.interval == 0)
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96))
      );
  }

  step() {
    this.y += this.speed;
    this.y = this.y % hl;
    this.change();
    this.display();
  }

  display() {
    if (this.first) 
      fill(180, 255, 180, this.opacity);
    else
      fill(0, 255, 70, this.opacity);
    text(this.value, this.x, this.y);
  }
}

class Stream {
  constructor() {
    this.stream = [];
    this.n = round(random(5, 30));
    this.speed = random(1, 5);
  }

  generate(x) {
    let y = random(-1000, 0);
    let opacity = 255;
    let opDec = (255 / (width / this.n))  / fade;
    for (let i = 0; i < this.n; i++) {
      this.stream.push(new Letter(x, y, this.speed, opacity))
      y -= letterSize;
      opacity -= opDec;
    }
    this.stream[0].first = true & !round(random());
  }

  display() {
    this.stream.forEach(function(letter) {
      letter.step();
    });
  }
}