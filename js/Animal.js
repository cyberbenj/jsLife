"use strict";

function Animal(position, isCarnivorous){
    this.position = position;
    this.isCarnivorous = isCarnivorous;
    this.color = (isCarnivorous) ? CARNIVOROUS_COLOR : HERBIVOROUS_COLOR;
    
    this.death = (isCarnivorous) ? CARNIVOROUS_DEATH : HERBIVOROUS_DEATH;
    if(RANDOM) this.death += random(this.death);
    this.life = 0;
    
    this.health = (isCarnivorous) ? CARNIVOROUS_HEALTH : HERBIVOROUS_HEALTH;
    this.hunger = (isCarnivorous) ? CARNIVOROUS_HUNGER : HERBIVOROUS_HUNGER;

    this.breeding = (isCarnivorous) ? CARNIVOROUS_BREEDING : HERBIVOROUS_BREEDING;
    this.broods = (isCarnivorous) ? CARNIVOROUS_BROODS : HERBIVOROUS_BROODS;

    this.fieldOfView = (isCarnivorous) ? CARNIVOROUS_FIELD_OF_VIEW : HERBIVOROUS_FIELD_OF_VIEW;
    this.target = position;
    this.targetEntity = null;
}

Animal.prototype.render = function(){
    App.canvas.drawPixel(this.position, this.color);
};

Animal.prototype.update = function(){
    this.life += 1;
    this.health -= 1;

    if(this.life < this.death && this.health > 0){
        if(this.life%this.breeding === 0){
		    this.breed();
        }
        
        if(this.health < this.hunger){
            this.hunt();
        }
        
        this.move();
    }else{
        this.die();
    }
};

Animal.prototype.hunt = function(){
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
            this.health = HERBIVOROUS_HEALTH;
        }

        if(this.targetEntity instanceof Animal){
            App.animals.splice(App.animals.indexOf(this.targetEntity), 1);
            this.health = CARNIVOROUS_HEALTH;
        }
        
        this.target = App.canvas.getRandomPosition();
        this.targetEntity = null;
    }

    let r = radian(this.position, this.target);
    let speed = 0.2;
    this.position[0] += Math.cos(r)*speed;
    this.position[1] += Math.sin(r)*speed;
};

Animal.prototype.breed = function(){
	let broods = (RANDOM) ? random(this.broods) : this.broods;
	while(broods > 0){
        App.animals.push(new Animal([...this.position], this.isCarnivorous));
		broods -= 1;
	}
};

Animal.prototype.die = function(){
    let key = App.animals.indexOf(this);
    App.animals.splice(key, 1);
};