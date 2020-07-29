var sentence;
var len = 150;
var rules;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angle = radians(angles[5]);
  rules = rulesSet.slice(5,7);
  sentence = axioms[5];
  background(51);
  turtle();
  var button = createButton("Расти");
  button.position(width - 300, 20);
  button.mousePressed(generate);
}

function turtle() {
  background(51);
  resetMatrix();
  translate(width * 0.25, height);
  stroke(255, 100);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);

    if (current == "F") {
      stroke(255, 100);
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle)
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      fill(255, 70, 70, 100);
      ellipse(0, 0, 8, 8);
      pop();
    }
  }
}

var rulesSet = [];
var axioms = [];
var angles = [];

axioms[0] = "F";
angles[0] = 30;
rulesSet[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}

axioms[1] = "X";
angles[1] = 22.5;
rulesSet [1] = {
  a: "F",
  b: "FF"
}
rulesSet[1 + 1] = {
  a: "X",
  b: "F-[[X]+X]+F[+FX]-X"
}

axioms[3] = "F+F+F+F";
angles[3] = 90;
rulesSet [3] = {
  a: "F",
  b: "FF+F-F+F+FF"
}

axioms[4] = "F";
angles[4] = 22.5;
rulesSet [4] = {
  a: "F",
  b: "FF+[F+F-FF]-[-F+FF-F]"
}

axioms[5] = "F";
angles[5] = 30;
rulesSet[5] = {
  a: "F",
  b: "FFX+[F+FF-FX]-[-F+XF-F]"
}
rulesSet[5 + 1] = {
  a: "X",
  b: "-F+[FF-F+FF]"
}

function generate() {
  len *= 0.5;
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  turtle();
}
