// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global createCanvas, random, background, fill, color, rect, ellipse, square,
stroke, noStroke, noFill, strokeWeight, colorMode,  width, height, text, HSB,
line, mouseX, mouseY, mouseIsPressed */

let drops = new Array;
let grassBlades = new Array;
let numberOfDrops = 100;
let grassIsTooHigh = false;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100);
  
  //initizalize as many drop objects as you wish! just change numberOfDrops
  for(let i = 0; i < numberOfDrops; i++){
    drops.push(new RainDrop( random(width),random(height),random(5,12),random(8,20) ) );
  }
  
  for(let i = 0; i < width; i+=10){
    grassBlades.push(new bladeOfGrass( i ,10, random(10,30) ) );
  }
  
}

function draw() {
  background(0, 0, 95);
  
  moveDrops();
  
  renderDrops();
  renderGrass();
  
}

function moveDrops(){
  drops.forEach( (drop) =>{
    drop.drip();
  });
}

function renderDrops(){
  drops.forEach((drop)=>{
    drop.render();
  });
}

function renderGrass(){
  grassBlades.forEach( (grass) => {
   grass.render();
   if(grass.height > height/5){
     grassIsTooHigh = true;
   }
  });
}

function growGrass(){
  if(grassIsTooHigh){
    
    grassBlades.forEach( (grass) => {
       grass.reset(); 
    });
    grassIsTooHigh = false;
  } else{
    
  grassBlades.forEach( (grass) => {
     grass.grow(random(1,5)); 
  });
    
  }
  
}

class RainDrop {
  constructor(x, y, d, fallSpeed) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.fallSpeed = fallSpeed;
  }
  
  drip(){
    //move droplet down
    this.y += this.fallSpeed;
    
    //reset it if it goes past canvas
    //also randomly calls the grow grass function sometimes
    //this is for the rain drops

    if(this.y > height){
      //move it back up
      this.y = 0;
      //move it to some random location along the horizontal
      this.x = random(width);
      //randomize fall speed and diameter just for fun
      this.fallSpeed = random(8,20);
      this.d = random(5,12);
      if(random(2) < .05){
        growGrass();
      }
    }
    
  }
  
  render(){
    //draw the droplet
    noStroke();
    fill(60, 80, 80);
    ellipse(this.x, this.y, this.d);
  }
}

class bladeOfGrass{
  constructor(x,gwidth,gheight){
    this.x = x;
    this.width = gwidth;
    this.height = gheight;
    this.y = height-gheight;
  }
  render(){
    noStroke();
    fill('green');
    rect(this.x,this.y,this.width,this.height);
  }
  
  grow(deltaHeight) {
    this.height += deltaHeight;
    this.y = height - this.height;
  }
  reset(){
    this.height = random(10,30);
    this.y = height - this.height;
  }
}