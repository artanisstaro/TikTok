var anchors = [];
var p;
var d = 1;

function setup() {
  createCanvas(400, 400);
  anchors.push(createVector(width / 2, height / 8));
  anchors.push(createVector(width / 8, 7 * height / 8));
  anchors.push(createVector(7 * width / 8, 7 * height / 8));

  stroke(255);
  strokeWeight(8);

  p = createVector(width * 0.35, height / 2)

  background(31);

  point(p.x, p.y)
  for (let i = 0; i < anchors.length; i++)
    point(anchors[i].x, anchors[i].y)
}

function next() {
  let r = random([0, 1, 2]);
  let aim = p5.Vector.sub(anchors[r], p)
  aim.div(2)
  p.add(aim)
  point(p.x, p.y)
}

function draw() {
  for (let i = 0; i < d; i++)
    next();
}

function touchStarted() {
  d += 1;
}