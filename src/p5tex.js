const p5 = require('p5');

import Element from './wanderer';

export default class {

  constructor () {
    this.p5instance = null;
    this.canvas = null;
  }
  init () {
    this.p5instance = new p5(this.sketch.bind(this));
  }
  sketch(p) {
    let cursor;
  	let elements;
  	let emotes, shapes;
  	let despair, dissapointment, heh, okay, sad, cool, ok, sos, brush;
  	let index;
  	let bg;
    let hue;
    let _this = this;
    p.preload = function () {
      okay = p.loadImage('src/emoji/okay.png');
    }

    p.setup = function() {
      hue =  p.random(0,255);
      p.createCanvas(p.windowWidth, p.windowHeight);
  		p.noStroke();
  		p.smooth();
  		// let rad = Math.round(p.random(10,20));
  		//
  		elements = [];
  		// let total = Math.round(p.random(10, 100));
  		let total = 1000;
  		for (var i = 0; i < total; i++) {
  			//emotes[p.round(p.random(0,4))]
  			let element = new Element(p.random(0, p.windowWidth), p.random(0, p.windowHeight),10,okay,p , i);
  			elements.push(element);
  		}
  		// p.noLoop();
      _this.canvas = p.canvas;
    }

    p.draw = function() {
      p.colorMode(p.HSB, 255);
      hue +=0.05;
      // console.log(hue);
      if (hue > 255) {
        hue = hue -255;
      }
      bg = p.color(hue,p.random(120,150), p.random(200,250), 10);

  		p.background(bg);

  		for (var i = 0; i < elements.length; i++) {
  			elements[i].wander();
  			elements[i].run();
  			// elements[i].mousesMoved(elements[10].location.x,elements[10].location.y);
  		}
  		// element.wander();
  		// element.run();
  	}
  }

}
