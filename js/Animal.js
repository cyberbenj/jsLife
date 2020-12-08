"use strict";

function Animal(position, isCarnivorous){
    this.position = position;
    this.isCarnivorous = isCarnivorous;
    this.color = (isCarnivorous) ? ANIMAL_CARNIVOROUS_COLOR : ANIMAL_HERBIVOROUS_COLOR;
    this.lifeSpan = ANIMAL_LIFE_SPAN+random(ANIMAL_LIFE_SPAN);
    this.life = 0;
    this.health = 200;
    this.fieldOfView = 10;
    this.target = position;
}

Animal.prototype.render = function(){
    App.canvas.drawPixel(this.position, this.color);
};

Animal.prototype.update = function(){
    this.life += 1;
		//this.health -= 1;

    if(this.life < this.lifeSpan && this.health > 0){
        if(this.life%ANIMAL_BREEDING_CYCLE === 0){
		    this.spread();
        }
        //this.search();
        this.move();
    }else{
        this.die();
    }
};

Animal.prototype.getTarget = function(){
    return App.canvas.getRandomPosition();
};

Animal.prototype.search = function(){
    let entities = (this.isCarnivorous) ? App.animals : App.vegetables;
    
    let target = null;
    for(let entity of entities){
        //if(entity !== this && (this.isCarnivorous && !entity.isCarnivorous)){
        //if(entity !== this && distance(this.entity) <= this.fieldOfView){
        if(entity !== this && distance(this.position, entity.position) <= this.fieldOfView){
            if(target === null || distance(this.position, entity.position) < distance(this.position, target.position)){
                if(!this.isCarnivorous || entity.isCarnivorous !== this.isCarnivorous){
                    target = {x: entity.position.x, y: entity.position.y};
                }
            }
        }
    }

    target = null;

    if(target !== null){
        this.target = target;
    }
};

Animal.prototype.move = function(){
    var distance = Math.floor(Math.hypot(this.target.x-this.position.x, this.target.y-this.position.y));
    if(distance <= 0){
        this.target = this.getTarget();
    }

    /*if(distance(this.position, this.target) <= 0){
        this.target = this.getTarget();
    }*/

    //var r = radian(this.position, this.target);

    /*let position = {x: this.position.x, y: this.position.y};
    let target = {x: this.target.x, y: this.target.y};

    if(distance(position.x, position.y, target.x, target.y) <= 0){
        //this.target = App.canvas.getRandomPosition();
        this.target = this.getTarget();
    }*/

    let radian = Math.atan2(this.target.y-this.position.y, this.target.x-this.position.x);
    let speed = 0.2;
    this.position.x += Math.cos(radian)*speed;
    this.position.y += Math.sin(radian)*speed;

    
    
    /*
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
    */
};

Animal.prototype.spread = function(){
	let broods = random(ANIMAL_MAX_BROOD);
	while(broods > 0){
		App.animals.push(new Animal({x: this.position.x, y: this.position.y}, this.isCarnivorous));
		broods -= 1;
	}
};

Animal.prototype.die = function(){
    let key = App.animals.indexOf(this);
    App.animals.splice(key, 1);
};