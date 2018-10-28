var sun;
var planet1, planet2, planet3;
var planets = [];
var numPlanets = 30;
// var aSound;
var colorPalette = [
								[200,10,0],
  							[100,100,0],
  							[200,10,200]
];

var soundPalette = [220,250,290];

// function preload(){

// 	aSound = loadSound();

// }

setInterval(newPlanet, 1000);
setTimeout(resetPlanets,100000);


function setup() {
  createCanvas(400, 400);
  frameRate(7);
  strokeWeight(2);

	sun = new CenterCircle();
  
  var randomChoice = int(random(colorPalette.length));
  
  var thisColor = colorPalette[randomChoice];
  var thisSound = soundPalette[randomChoice];
  
  
  //planets.push(new Orbiter(width/2, height/5, 90, palette[int(random(palette.length))], 0.01, 250));
  
  
  
//   for(var i =0; i < numPlanets; i++){
  
//   	planets[i] = new Orbiter(width/2, height/5, 30, [random(255), random(255), random(235), random(255)], random(0.001,0.2), 250, random(200,600));
  
//   }
  
  // planet1 = new Orbiter(width/2, height/5, 20, [120, 0,120], 0.01);
  // planet2 = new Orbiter(width/2, height/5, 20,  [0, 0,120], 0.001);
  // planet3 = new Orbiter(width/2, height/5, 20,   [200, 200,120], 0.1);
  
  //planets = [planet1, planet2, planet3];
  
  
}

function draw() {
  background(0);  
  fill(250);
  ellipse(width/2, height/2, 380);
  
  sun.display();
  
  var soundsPlaying = 0;
  
  for(var i = 0; i < planets.length; i++){
  	planets[i].move(sun.size, sun.x);
    planets[i].display();
    

    if(planets[i].triggered){
    	soundsPlaying++
    }    
    
    
    if(soundsPlaying > 0){
    	sun.color = [random(255),random(255), random(255), 250];
      sun.innerSize = 0;
    } else {
    	sun.color = [225,225,70, 250];
      sun.innerSize = 90;
      
    }
  }
	sun.displayInner();
  
}



class CenterCircle {
	constructor(){
  	this.x = width/2;
    this.y = height/2;
    this.size = 100;
    this.innerSize = 90;
    this.color = [225,225,70, 20];
    
  }
  
  display(){
  	fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
  
  displayInner(){ 
  	fill(0);
    ellipse(this.x,this.y, this.innerSize);
  
  }
  
  
  


}


class Orbiter {
	constructor(x,y,size,opacity,speed, spacer, frequency, upSpeed){
  	this.x = x;
    this.y = y;
    this.size = size;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.o = opacity;
    this.increment = speed;
    this.theta = 0;
    this.spacer = spacer;
    this.finalSpacer = 0;
    this.alive = true;
    this.direction = -1;
    this.osc = new p5.Oscillator();
    this.osc.freq(frequency);
    this.osc.start();
    this.osc.amp(0);
    this.upSpeed = upSpeed;
    this.triggered = false;
    
      this.resetTrigger = this.resetTrigger.bind(this);
  }
  

  
  
  display(){
    if(this.alive){
      
      	fill([this.r, this.g, this.b, this.o]);
   		 	ellipse(this.x, this.y, this.size);
    } else {
    		console.log("dead");
    	}

  }
  
  move(radius, center){
  	if(this.spacer < this.finalSpacer){
      this.direction = this.direction * -1;
      this.osc.amp(0.2);    
      this.o = 255;
      this.triggered = true;
      this.size+=100;
      setTimeout(this.resetTrigger,300);
      
    }
    
    if(this.spacer > 50) {

    }
    
    if(this.spacer > 150) {
      	this.direction = this.direction * -1;
 
    }
    
  	this.size-=2;
    //this.increment = this.increment/this.size;
    
    this.spacer = this.spacer + (this.upSpeed * this.direction);
    this.theta+= this.increment;
    
   
  	this.x = cos(this.theta) * (radius+this.size+this.spacer)/2 + center;
    this.y = sin(this.theta) * (radius+this.size+this.spacer)/2 + center; 
  }
  
  checkLife(){
    if(this.spacer < 0){
      this.alive = false;
    }
  
  }
  
  resetTrigger(){
  	          this.osc.amp(0);
      		this.o = 60;
       		this.triggered = false;
    
  
  }

  

}

function mousePressed(){

	  planets.push(new Orbiter(width/2, height/5, 90, palette[int(random(palette.length))], 0.1, 250));
}



function newPlanet(){

  planets.push(new Orbiter(width/2, height/5, random(30,50), 60, random(0.1,0.3), 50, ((planets.length+1)%30)*220, random(3,7)));
    
}


function resetPlanets(){

	planets = [];

}
