"use strict";

function Animal(position, isCarnivorous, settings){
    this.position = position;
    this.isCarnivorous = isCarnivorous;
    this.color = settings.color;
    this.death = settings.death;
    if(App.settings.random) this.death += random(this.death);
    this.life = 0;
    this.health = settings.health;
    this.hunger = settings.hunger;
    this.breeding = settings.breeding;
    this.broods =  settings.broods;
    this.fieldOfView = settings.FOV;
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
            this.health = App.settings.herbivorous.health;
        }

        if(this.targetEntity instanceof Animal){
            App.animals.splice(App.animals.indexOf(this.targetEntity), 1);
            this.health = App.settings.carnivorous.health;
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
    let broods = (App.settings.random) ? random(this.broods) : this.broods;
    let settings = (this.isCarnivorous) ? App.settings.carnivorous : App.settings.herbivorous;
	while(broods > 0){
        App.animals.push(new Animal([...this.position], this.isCarnivorous, settings));
		broods -= 1;
	}
};

Animal.prototype.die = function(){
    let key = App.animals.indexOf(this);
    App.animals.splice(key, 1);
};