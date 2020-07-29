class Star {
   constructor(){
      this.pos = createVector(
      random(-width,width),
      random(-height/2,height/2),
      random(width*2.5)
      );
      this.m = -1;
      this.ind = false;
      this.toDraw = true;
   }
   
   update(){
      if (this.pos.z <= -800) {
         this.m = random(4, 8);
         this.ind = true;
      }
      this.pos.z += this.m * 4;
   }
   
   display(){
      if (this.toDraw) {
         let sx = map(this.pos.x / this.pos.z, 0, 1, 0, width);
         let sy = map(this.pos.y / this.pos.z, 0, 1, 0, height);
         if (this.ind)
         if (sx > width/2 || sx < -width/2 || sy > height/2 || sy < -height/2) 
         this.toDraw = false;
         ellipse(sx, sy, 5);
      }
   }
}

var stars = [];

function setup() {
   createCanvas(windowWidth, windowHeight);
   for (let i=0;i<500;i++){
      stars.push(new Star());
   }
}

function draw() {
   background(31, 40);
   translate(width/2, height/2);
   for (let i = 0; i < 500; i++) {
      stars[i].display();
      stars[i].update(); 
   }
}