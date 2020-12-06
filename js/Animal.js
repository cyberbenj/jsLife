"use strict";

function Animal(position, isCarnivorous){
    this.position = position;
    this.isCarnivorous = isCarnivorous;
    this.isFemale = (random(1) === 1);
    this.life = ANIMAL_MAX_LIFE+random(ANIMAL_MAX_LIFE);
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
    var distance = Math.floor(Math.hypot(this.target.x-this.position.x, this.target.y-this.position.y));
    if(distance <= 0){
        this.target = this.getTarget();
    }

    var radian = Math.atan2(this.target.y-this.position.y, this.target.x-this.position.x);
    let speed = 0.2;
    this.position.x += Math.cos(radian)*speed;
    this.position.y += Math.sin(radian)*speed;

    if(this.isCarnivorous){
        for(let animal of App.animals){
            if(this.position.x === animal.position.x && this.position.y === animal.position.y && !animal.isCarnivorous){
                let key = App.animals.indexOf(animal);
                App.animals.splice(key, 1);
            }
        }
    }else{
        for(let vegetable of App.vegetables){
            if(this.position.x === vegetable.position.x && this.position.y === vegetable.position.y){
                let key = App.vegetables.indexOf(vegetable);
                App.vegetables.splice(key, 1);
            }
        }
    }
    
};

Animal.prototype.die = function(){
    //App.vegetables.push(new Vegetable({x: this.position.x, y: this.position.y}));
    let key = App.animals.indexOf(this);
    App.animals.splice(key, 1);
};