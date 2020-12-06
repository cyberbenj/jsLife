"use strict";

function Animal(position, isCarnivorous){
    this.position = position;
    this.isCarnivorous = isCarnivorous;
    this.isFemale = (Math.round(Math.random()) === 1);
    this.life = ANIMAL_MAX_LIFE;
    this.color = (isCarnivorous) ? ANIMAL_CARNIVOROUS_COLOR : ANIMAL_HERBIVOROUS_COLOR;
    this.target = position;
}

Animal.prototype.render = function(){
    App.canvas.drawPixel(this.position, this.color);
};

Animal.prototype.update = function(){
    this.life -= 1;

    if(this.life > 0){
        this.move();
    }else{
        this.die();
    }
};

Animal.prototype.getTarget = function(){
    return App.canvas.getRandomPosition();
};

Animal.prototype.move = function(){
    var distance = Math.floor(Math.hypot(this.target.x-this.position.x,this.target.y-this.position.y));
    if(distance <= 0){
        this.target = this.getTarget();
    }

    var radian = Math.atan2(this.target.y-this.position.y, this.target.x-this.position.x);
    let speed = 0.2;
    this.position.x += Math.cos(radian)*speed;
    this.position.y += Math.sin(radian)*speed;
};

Animal.prototype.die = function(){
    let key = App.animals.indexOf(this);
    App.animals.splice(key, 1);
};