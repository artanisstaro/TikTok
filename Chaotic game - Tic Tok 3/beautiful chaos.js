var anchors = [];
var p;
var d = 100;

var offset = 0;
var tria = false;
var button;

function change() {
  background(31);
  tria = !tria;
}

function setup() {
  createCanvas(400, 400);
  background(31);

  button = createButton("Change figure");
  button.mousePressed(change);
  button.position((width - button.width) / 2, height - button.height);

  anchors.push(createVector(width / 2, height / 8));
  anchors.push(createVector(width / 8, 7 * height / 8));
  anchors.push(createVector(7 * width / 8, 7 * height / 8));

  colorMode(HSB, 255, 255, 255);

  stroke(noise(offset) * 255, 255, 255);
  strokeWeight(6);

  p = createVector(width * 0.35, height / 2)



  point(p.x, p.y)
  for (let i = 0; i < anchors.length; i++)
    point(anchors[i].x, anchors[i].y)
}

function next() {
  let r = random([0, 1, 2]);
  let aim = p5.Vector.sub(anchors[r], p)
  aim.div(2)
  p.add(aim)
  if (tria)
    triangle(p.x, p.y - 1, p.x - 1, p.y + 1, p.x + 1, p.y + 1);
  else
    point(p.x, p.y)
}

function draw() {
  for (let i = 0; i < d; i++) {
    stroke(noise(offset) * 255, 255, 255);
    next();
    offset += 0.25;
  }
}