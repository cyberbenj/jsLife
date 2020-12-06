"use strict";

function Canvas(parent, id, width = 0, height = 0, backgroundColor){
    this.parent = parent;
    this.id = id;
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;
    this.init();
}

Canvas.prototype.init = function(){
    let canvas = document.createElement("canvas");
    canvas.id = this.id;
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.backgroundColor = "rgb("+this.backgroundColor.join(", ")+")";
    this.parent.appendChild(canvas);
};

Canvas.prototype.get = function(){
    let canvas = document.getElementById(this.id);
    return canvas;
};

Canvas.prototype.zoom = function(){
    let maxWidth = Math.floor(window.innerWidth/this.width);
    let maxHeight = Math.floor(window.innerHeight/this.height);
    let zoom = Math.max(Math.min(maxWidth, maxHeight), 1);
    this.get().style.transform = "scale("+zoom+")";
};

Canvas.prototype.clear = function(){
    let ctx = this.get().getContext("2d");
    ctx.fillStyle = "rgb("+this.backgroundColor.join(", ")+")";
    ctx.fillRect(0, 0, this.width, this.height);
};

Canvas.prototype.drawPixel = function(position, color){
    let ctx = this.get().getContext("2d");
    let pixel = ctx.createImageData(1, 1);
    let data = pixel.data;
    data[0] = color[0];
    data[1] = color[1];
    data[2] = color[2];
    data[3] = 255;
    ctx.putImageData(pixel, position.x, position.y);
};

Canvas.prototype.getPixel = function(position){
    let ctx = this.get().getContext("2d");
    let data = ctx.getImageData(position.x, position.y, 1, 1).data;
    return [data[0], data[1], data[2]];
};

Canvas.prototype.getRandomPosition = function(){
    return {x: random(this.width), y: random(this.height)};
};