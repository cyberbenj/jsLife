"use strict";

function Vegetable(position, settings){
    this.position = position;
    this.color = settings.color;
    this.death = settings.death;
    if(SETTINGS.main.random) this.death += APP.random(this.death);
    this.life = 0;
    this.seeding = settings.seeding;
    this.seeds = settings.seeds;
}

Vegetable.prototype.render = function(){
    CANVAS.drawPixel(this.position, this.color);
};

Vegetable.prototype.update = function(up){
    if(up){
        this.life += 1;
        if(this.life < this.death){
            if(this.life%this.seeding === 0 && APP.animals.length > 0){
                this.spread();
            }
        }else{
            this.die();
        }
    }
};

Vegetable.prototype.spread = function(){
    if(APP.vegetables.length < (CANVAS.width*CANVAS.height)/3){
        let seeds = (SETTINGS.main.random) ? APP.random(this.seeds) : this.seeds;
        while(seeds > 0){
            APP.vegetables.push(new Vegetable(CANVAS.getRandomPosition(), SETTINGS.vegetable));
            seeds -= 1;
        }
    }
}

Vegetable.prototype.die = function(){
    let key = APP.vegetables.indexOf(this);
    APP.vegetables.splice(key, 1);
};