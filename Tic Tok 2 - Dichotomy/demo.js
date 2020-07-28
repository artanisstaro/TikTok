var iteration = 0; // to count iteration

var startingA = 3;
var startingB = 6;
var pointA = startingA; // starting A point
var pointB = startingB; // starting B point
var checkpointA = [pointA];
var checkpointB = [pointB];
var mapedXa, mapedXb, mapedYa, mapedYb, mapedXx1, mapedXx2, mapedYx1, mapedYx2, mapedCx, mapedCy;

var funcMin, funcMax; // to know how to draw

var epsilon = 1; // to check accuracity
var sigma = epsilon / 2; // same

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Back, translate and other settings
  background(51);
  translate(0, height);
  fill(255, 0, 85);
  if (width > height) textSize(height / 20);
  else textSize(width / 22);

  textAlign(CENTER, CENTER);
  textFont('Times New Roman');
  textStyle(BOLD);

  stroke(0, 100, 205);
  strokeWeight(2);
  // X axis
  line(width / 16, -height / 4, width / 16, -7 * height / 8);
  // Y axis
  line(width / 16, -height / 4, 15 * width / 16, -height / 4);

  // Display function
  noStroke();
  text(displayName + ` | epsilon = ${epsilon} | sigma = ${sigma}`, width / 2, -7 * height / 8);

  let x1 = CalculateDots(1);
  let x2 = CalculateDots(2);

  // Display variables
  text(`a${iteration} = ${pointA}`, width / 8, -height / 6);
  text(`b${iteration} = ${pointB}`, width / 8, -height / 16);

  text(`x1 = ${x1}`, 7 * width / 8, -height / 6);
  text(`x2 = ${x2}`, 7 * width / 8, -height / 16);

  // Display supporting lines
  mapedXa = map(pointA, startingA, startingB, width / 4, 6 * width / 8);
  mapedYa = map(f(pointA), 19, 21, -3 * height / 8, -3 * height / 4);
  mapedXb = map(pointB, startingA, startingB, width / 4, 6 * width / 8);
  mapedYb = map(f(pointB), 19, 21, -3 * height / 8, -3 * height / 4);

  stroke(0, 255, 0);
  strokeWeight(2);
  line(mapedXa, -height / 4, mapedXa, mapedYa);
  line(mapedXb, -height / 4, mapedXb, mapedYb);

  noStroke();
  fill(0, 255, 0);
  text(`a${iteration}`, mapedXa, -height / 4 + height / 16);
  text(`b${iteration}`, mapedXb, -height / 4 + height / 16);


  mapedXx1 = map(x1, startingA, startingB, width / 4, 6 * width / 8);
  mapedYx1 = map(f(x1), 19, 21, -3 * height / 8, -3 * height / 4);
  mapedXx2 = map(x2, startingA, startingB, width / 4, 6 * width / 8);
  mapedYx2 = map(f(x2), 19, 21, -3 * height / 8, -3 * height / 4);
  mapedCx = map((x2 + x1) / 2, startingA, startingB, width / 4, 6 * width / 8);
  mapedCy = map(f((x2 + x1) / 2), 19, 21, -3 * height / 8, -3 * height / 4);

  stroke(128, 0, 128);
  line(mapedXx1, -height / 4, mapedXx1, mapedYx1);
  line(mapedXx2, -height / 4, mapedXx2, mapedYx2);
  stroke(255);
  line(mapedCx, -height / 4, mapedCx, mapedCy);

  fill(128, 0, 128);
  noStroke()
  text(`x1`, mapedXx1, -height / 4 + height / 32);
  text(`x2`, mapedXx2, -height / 4 + height / 32);
  fill(255)
  text(`c`, mapedCx, -height / 4 + height / 32);

  // Function graphic
  stroke(255, 0, 105);
  strokeWeight(5);
  for (let i = pointA; i <= pointB; i += 0.1)
    point(map(i, startingA, startingB, width / 4, 6 * width / 8), map(f(i), 19, 21, -3 * height / 8, -3 * height / 4));

  // Show progress
  noStroke();
  fill(255);
  text(`|b${iteration} - a${iteration}| = ${roundTens(abs(pointB - pointA))} ${(roundTens(abs(pointB - pointA)) > epsilon) ? ">" : "<"} epsilon`, width / 2, -height / 16);

  // Step
  if (f(x1) < f(x2)) pointB = x2;
  else pointA = x1;
}

function CalculateDots(t) {
  let midSum = pointA + pointB;
  if (t == 0) return midSum;
  else if (t == 1) return roundTens((midSum - sigma) / 2);
  return roundTens((midSum + sigma) / 2);
}

function f(x) {
  return sin(x) + 20;
}

var displayName = "f(x) = sin(x) + 20";

function keyPressed() {
  if (keyCode == 37 && iteration > 0) {
    iteration--;
    pointA = checkpointA[iteration];
    pointB = checkpointB[iteration];
    step();
    checkpointA.pop();
    checkpointA.pop();
    checkpointB.pop();
    checkpointB.pop();
  }
  if (keyCode == 39) {
    iteration++;
    step();
  }
}

function touchStarted() {
  iteration++;
  step();
}

function step() {
  // Create checkpoint
  checkpointA.push(pointA);
  checkpointB.push(pointB);
  // console.log(checkpointA);
  // Draw section
  {
    // Back
    background(51);

    stroke(0, 100, 205);
    strokeWeight(2);
    // X axis
    line(width / 16, -height / 4, width / 16, -7 * height / 8);
    // Y axis
    line(width / 16, -height / 4, 15 * width / 16, -height / 4);

    // Display function
    fill(255, 0, 85);
    noStroke();
    text(displayName + ` | epsilon = ${epsilon} | sigma = ${sigma}`, width / 2, -7 * height / 8);

    let x1 = CalculateDots(1);
    let x2 = CalculateDots(2);

    // Display variables
    text(`a${iteration} = ${pointA}`, width / 8, -height / 6);
    text(`b${iteration} = ${pointB}`, width / 8, -height / 16);

    text(`x1 = ${x1}`, 7 * width / 8, -height / 6);
    text(`x2 = ${x2}`, 7 * width / 8, -height / 16);

    // Display supporting lines
    mapedXa = map(pointA, startingA, startingB, width / 4, 6 * width / 8);
    mapedYa = map(f(pointA), 19, 21, -3 * height / 8, -3 * height / 4);
    mapedXb = map(pointB, startingA, startingB, width / 4, 6 * width / 8);
    mapedYb = map(f(pointB), 19, 21, -3 * height / 8, -3 * height / 4);

    stroke(0, 255, 0);
    strokeWeight(2);
    line(mapedXa, -height / 4, mapedXa, mapedYa);
    line(mapedXb, -height / 4, mapedXb, mapedYb);

    noStroke();
    fill(0, 255, 0);
    text(`a${iteration}`, mapedXa, -height / 4 + height / 16 + height / 64);
    text(`b${iteration}`, mapedXb, -height / 4 + height / 16 + height / 64);

    mapedXx1 = map(x1, startingA, startingB, width / 4, 6 * width / 8);
    mapedYx1 = map(f(x1), 19, 21, -3 * height / 8, -3 * height / 4);
    mapedXx2 = map(x2, startingA, startingB, width / 4, 6 * width / 8);
    mapedYx2 = map(f(x2), 19, 21, -3 * height / 8, -3 * height / 4);
    mapedCx = map((x2 + x1) / 2, startingA, startingB, width / 4, 6 * width / 8);
    mapedCy = map(f((x2 + x1) / 2), 19, 21, -3 * height / 8, -3 * height / 4);

    stroke(128, 0, 128);
    line(mapedXx1, -height / 4, mapedXx1, mapedYx1);
    line(mapedXx2, -height / 4, mapedXx2, mapedYx2);
    stroke(255);
    line(mapedCx, -height / 4, mapedCx, mapedCy);

    fill(128, 0, 128);
    noStroke()
    text(`x1`, mapedXx1, -height / 4 + height / 32);
    text(`x2`, mapedXx2, -height / 4 + height / 32);
    fill(255)
    text(`c`, mapedCx, -height / 4 + height / 32);

    // Function graphic
    stroke(255, 0, 105, 150);
    strokeWeight(5);
    for (let i = startingA; i <= startingB; i += 0.1)
      point(map(i, startingA, startingB, width / 4, 6 * width / 8), map(f(i), 19, 21, -3 * height / 8, -3 * height / 4));

    stroke(255, 0, 105);
    for (let i = pointA; i <= pointB; i += 0.1)
      point(map(i, startingA, startingB, width / 4, 6 * width / 8), map(f(i), 19, 21, -3 * height / 8, -3 * height / 4));

    // Show progress
    noStroke();
    fill(255);
    text(`|b${iteration} - a${iteration}| = ${roundTens(abs(pointB - pointA))} ${(roundTens(abs(pointB - pointA)) > epsilon) ? ">" : "<"} epsilon`, width / 2, -height / 16);

    // Show answer
    if (roundTens(abs(pointB - pointA)) < epsilon) {
      fill(0, 255, 0);
      text(`min f(x) = ${roundTens((pointA + pointB) * 0.5)}`, width / 2, -6 * height / 8)
      text(`[${startingA}, ${startingB}]`, width / 2, -5.5 * height / 8)
    }

    if (f(x1) < f(x2)) pointB = x2;
    else pointA = x1;
  }
}

function roundTens(x) {
  return Math.floor(x) + Math.floor((x - Math.floor(x)) * 1000) / 1000;
}