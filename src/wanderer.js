const p5 = require('p5');

export default class {

	constructor(x, y, rad, emote, p, index) {
		this.index = index;
		this.rad = rad;
		this.p = p;
		this.acceleration = p.createVector(0,0);
		this.velocity = p.createVector(0,0);
    this.location = p.createVector(x,y);
		this.r = 6;
	 	this.wandertheta = 0;
	 	this.maxspeed = 10.5;
	 	this.maxforce = 100.1;
		this.emote  = emote;
		this.emote.resize(10,10);
		this.wanderR = 555;         // Radius for our "wander circle"
		this.wanderD = 800;         // Distance for our "wander circle"
		this.change = 800.3;

	}

	run() {
    this.update();
    this.borders();
    this.display();
  }

  update() {

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  wander() {

    this.wandertheta += this.p.random(-this.change,this.change);

    let circleloc = this.velocity.copy();
    circleloc.normalize();
    circleloc.mult(this.wanderD);
    circleloc.add(this.location);

    let h = this.velocity.heading();

    let circleOffSet = this.p.createVector(this.wanderR*Math.cos(this.wandertheta+h),this.wanderR*Math.sin(this.wandertheta+h));

    let target = p5.Vector.add(circleloc,circleOffSet);
		// let target = this.p.createVector(this.p.mouseX, this.p.mouseY)
		// target.normalize()
		// let ranPos = positions[this.index];
		// let xscale = this.p.windowWidth/vid.width,
		// 		yscale = this.p.windowHeight/vid.height;
		// if (ranPos){
		// 	this.seek(this.p.createVector(ranPos[0]*xscale, ranPos[1]*yscale));
    //
		// }
    this.seek(target);
		// this.drawWanderStuff(this.location,circleloc,target,wanderR);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }



  seek(target) {
    let desired = p5.Vector.sub(target,this.location);  // A vector pointing from the location to the target
    desired.normalize();
    desired.mult(this.maxspeed);
    let steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    this.applyForce(steer);
  }

  display() {
    let theta = this.velocity.heading() + this.p.radians(90);
    // this.p.fill(this.p.color(this.p.random(255),this.p.random(255),this.p.random(255), 100));
    // this.p.stroke(this.p.color(255-this.p.random(10,20),255-this.p.random(100,245),255-this.p.random(150,255), 100));
		// this.p.ellipse(this.location.x,this.location.y, this.rad, this.rad);
		// this.p.rectMode(this.p.RADIUS);
		let rad = 100 + (Math.sin(this.p.frameCount/100.0)*25.0)
		// if (frameCount)
		// this.p.rotate(theta);
		// this.p.push();

		// this.p.image(this.emote, this.location.x, this.location.y, rad, rad);
		// this.p.fill(this.p.random(0,255),this.p.random(0,255),this.p.random(0,255));
		// this.p.stroke(this.p.random(0,255),this.p.random(0,255),this.p.random(0,255));
		// this.p.stroke('red');
		// this.p.tint(this.tint, 127);
    // this.p.noFill();
    this.p.fill(this.p.color(this.p.random(250,255),this.p.random(150,165),this.p.random(100,125), 10));
		this.p.ellipse( this.location.x, this.location.y,50,100);
		// this.tint = this.p.color(this.p.random(0,255),this.p.random(0,255),this.p.random(0,255));
		// this.p.pop();
		// this.p.pop();
    // this.p.push();
    // this.p.translate(this.location.x,this.location.y);
    // this.p.rotate(theta);
    // this.p.beginShape(this.p.TRIANGLES);
    // this.p.vertex(0, -this.r*2);
    // this.p.vertex(-this.r, this.r*2);
    // this.p.vertex(this.r, this.r*2);
    // this.p.endShape();
    // this.p.pop();
  }
	// mouseMoved(mouseX, mouseY) {
	// 	this.maxspeed = this.p.map(mouseX*mouseY, 0, this.p.windowWidth * this.p.windowHeight, 0.1, 7.0);
	// 	this.maxforce = this.p.map(mouseY, 0, this.p.windowHeight, 0.5, 500);
	// 	this.wanderD = this.p.map(mouseX * mouseY, 0, this.p.windowWidth * this.p.windowHeight, 500, 1000);
	// 	// let rad = this.p.random(0, 10);
	// 	// this.emote.resize(rad,rad);
	// 	this.display();
	// }

  borders() {
		if (this.location.x < -this.rad) this.location.x = this.p.windowWidth+this.rad;
    if (this.location.y < -this.rad) this.location.y = this.p.windowHeight+this.rad;
    if (this.location.x > this.p.windowWidth+this.rad) this.location.x = -this.rad;
    if (this.location.y > this.p.windowHeight+this.rad) this.location.y = -this.rad;
  }
}
