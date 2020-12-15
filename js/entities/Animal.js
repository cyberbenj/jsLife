"use strict";

function Animal(position, isCarnivorous, settings){
    this.position = position;
    this.isCarnivorous = isCarnivorous;
    this.color = settings.color;
    this.death = settings.death;
    if(SETTINGS.main.random) this.death += APP.random(this.death);
    this.life = 0;
    this.health = settings.health;
    this.hunger = 0;
    this.hungry = settings.hungry;
    this.breeding = settings.breeding;
    this.broods =  settings.broods;
    this.fieldOfView = settings.FOV;
    this.speed = settings.speed;
    this.target = position;
    this.targetEntity = null;
}

Animal.prototype.render = function(){
    CANVAS.drawPixel(this.position, this.color);
};

Animal.prototype.update = function(){
    this.life += 1;
    this.hunger += 1;

    if(this.life < this.death && this.health > 0){
        if(this.hunger >= this.hungry){
            this.hunt();
            this.health -= 1;
        }else{
            if(this.life%this.breeding === 0){
                this.breed();
            }
        }
        this.move();
    }else{
        this.die();
    }
};

Animal.prototype.hunt = function(){
    let entities = (this.isCarnivorous) ? APP.animals : APP.vegetables;
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
            APP.vegetables.splice(APP.vegetables.indexOf(this.targetEntity), 1);
            this.health = SETTINGS.herbivorous.health;
            this.hunger = 0;
        }

        if(this.targetEntity instanceof Animal){
            APP.animals.splice(APP.animals.indexOf(this.targetEntity), 1);
            this.health = SETTINGS.carnivorous.health;
            this.hunger = 0;
        }

        this.target = CANVAS.getRandomPosition();
        this.targetEntity = null;
    }

    let r = radian(this.position, this.target);
    let speed = Math.min(distance(this.position, this.target), this.speed/10);

    this.position[0] += Math.cos(r)*speed;
    this.position[1] += Math.sin(r)*speed;
};

Animal.prototype.breed = function(){
    let broods = (SETTINGS.main.random) ? APP.random(this.broods) : this.broods;
    let settings = (this.isCarnivorous) ? SETTINGS.carnivorous : SETTINGS.herbivorous;
	while(broods > 0){
        APP.animals.push(new Animal([...this.position], this.isCarnivorous, settings));
        if(this.isCarnivorous){
            APP.carnivorousCount += 1;
        }else APP.herbivorousCount += 1;
		broods -= 1;
	}
};

Animal.prototype.die = function(){
    /*if(this.isCarnivorous){
        APP.carnivorousCount -= 1;
    }else APP.herbivorousCount -= 1;*/
    
    let key = APP.animals.indexOf(this);
    APP.animals.splice(key, 1);
};