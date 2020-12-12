"use strict";

function Vegetable(position, settings){
    this.position = position;
    this.color = settings.color;
    this.death = settings.death;
    if(App.settings.main.random) this.death += App.random(this.death);
    this.life = 0;
    this.seeding = settings.seeding;
    this.seeds = settings.seeds;
}

Vegetable.prototype.render = function(){
    App.canvas.drawPixel(this.position, this.color);
};

Vegetable.prototype.update = function(){
    this.life += 1;

    if(this.life < this.death){
        if(this.life%this.seeding === 0 && App.animals.length > 0){
            this.spread();
        }
    }else{
        this.die();
    }
};

Vegetable.prototype.spread = function(){
    if(App.vegetables.length < (App.canvas.width*App.canvas.height)/3){
        let seeds = (App.settings.main.random) ? App.random(this.seeds) : this.seeds;
        while(seeds > 0){
            App.vegetables.push(new Vegetable(App.canvas.getRandomPosition(), App.settings.vegetable));
            seeds -= 1;
        }
    }
}

Vegetable.prototype.die = function(){
    let key = App.vegetables.indexOf(this);
    App.vegetables.splice(key, 1);
};