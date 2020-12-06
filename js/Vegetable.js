"use strict";

const VEGETABLE_MAX_LIFE = 200;

function Vegetable(position){
    this.position = position;
    this.life = VEGETABLE_MAX_LIFE;
    this.color = [0, 255, 0];
}

Vegetable.prototype.render = function(canvas){
    canvas.drawPixel(this.position, this.color);
};