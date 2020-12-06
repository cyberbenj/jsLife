"use strict";

const ANIMAL_MAX_LIFE = 20;

function Animal(position, isCarnivorous){
    this.position = position;
    this.isCarnivorous = isCarnivorous;
    this.isFemale = (Math.round(Math.random()) === 1);
    this.life = 0;
    this.color = (isCarnivorous) ? [255, 0, 0] : [0, 0, 255];
}

Animal.prototype.render = function(canvas){
    canvas.drawPixel(this.position, this.color);
};