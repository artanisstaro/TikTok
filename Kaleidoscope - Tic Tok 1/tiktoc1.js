///////////////////////////////
// Tik Tok user - @eightlay ///
///////////////////////////////

var sym = 6;
var angle = 360/sym;
var offset = 0;
var halfw, halfh;
var sz = 16;
var button;

function setup() {
   // put setup code here
   createCanvas(windowWidth, windowHeight - 50);

   background(31);
   
   halfw = width /2;
   halfh = height /2;
   
   button = createButton("Clear");
   button.mousePressed(clearBg);
   button.position(halfw - button.width/2, height - button.height);
   
   angleMode(DEGREES);
   colorMode(HSB, 255, 255, 255);
   
   noStroke();
   
}

function clearBg() { 
   background(31);
}

function ellipseLine(sz) { 
   for (let i = 0; i < 1; i += 0.01) {
      ellipse(
      lerp(pmouseX - halfw, mouseX - halfw, i),
      lerp(pmouseY - halfh, mouseY - halfh, i),
      sz, sz
      )
   }
}

function draw() {
   if (mouseIsPressed && 
   mouseX > 0 && mouseX < width &&
   mouseY > 0 && mouseY < height) {
      translate(halfw, halfh);
      fill(noise(offset) * 255, 255, 255);
      offset += 0.01;
      for (let i = 0; i < sym; i++) {
         rotate(angle);
         ellipseLine(sz);
         push();
         scale(1, -1);
         ellipseLine(sz);
         pop();
      }
   }
}