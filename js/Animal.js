"use strict";

function Animal(position, isCarnivorous){
    this.position = position;
    this.isCarnivorous = isCarnivorous;
    this.color = (isCarnivorous) ? ANIMAL_CARNIVOROUS_COLOR : ANIMAL_HERBIVOROUS_COLOR;
    this.lifeSpan = ANIMAL_LIFE_SPAN+random(ANIMAL_LIFE_SPAN);
    this.life = 0;
    this.health = ANIMAL_MAX_HEALTH;
    this.fieldOfView = ANIMAL_FIELD_OF_VIEW;
    this.target = position;
    this.targetEntity = null;
}

Animal.prototype.render = function(){
    App.canvas.drawPixel(this.position, this.color);
};

Animal.prototype.update = function(){
    this.life += 1;
	this.health -= 1;

    if(this.life < this.lifeSpan && this.health > 0){
        if(this.life%ANIMAL_BREEDING_CYCLE === 0){
		    this.spread();
        }
        
        if(this.health < ANIMAL_MAX_HEALTH/2){
            this.search();
        }
        
        this.move();
    }else{
        this.die();
    }
};

Animal.prototype.search = function(){
    let entities = (this.isCarnivorous) ? App.animals : App.vegetables;
    let target = null;
    let targetEntity = null;

    for(let entity of entities){
        if(!this.isCarnivorous || (this.isCarnivorous && !entity.isCarnivorous)){
            if(distance(this.position, entity.position) <= this.fieldOfView){
                if(target === null || distance(this.position, entity.position) < distance(this.position, target)){
                    target = entity.position;
                    targetEntity = entity;
                }
            }
        }
    }

    if(target !== null){
        this.target = target;
        this.targetEntity = targetEntity;
    }
};

Animal.prototype.move = function(){
    if(this.target === null || distance(this.position, this.target) <= 0){
        if(this.targetEntity instanceof Vegetable){
            App.vegetables.splice(App.vegetables.indexOf(this.targetEntity), 1);
            this.health = ANIMAL_MAX_HEALTH*1.5;
        }

        if(this.targetEntity instanceof Animal){
            App.animals.splice(App.animals.indexOf(this.targetEntity), 1);
            this.health = ANIMAL_MAX_HEALTH*3;
        }
        
        this.target = App.canvas.getRandomPosition();
        this.targetEntity = null;
    }

    let r = radian(this.position, this.target);
    let speed = 0.2;
    this.position[0] += Math.cos(r)*speed;
    this.position[1] += Math.sin(r)*speed;
};

Animal.prototype.spread = function(){
	let broods = random(ANIMAL_MAX_BROOD);
	while(broods > 0){
        App.animals.push(new Animal([...this.position], this.isCarnivorous));
		broods -= 1;
	}
};

Animal.prototype.die = function(){
    let key = App.animals.indexOf(this);
    App.animals.splice(key, 1);
};