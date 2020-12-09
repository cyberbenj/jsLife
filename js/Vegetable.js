"use strict";

function Vegetable(position){
    this.position = position;
    this.color = VEGETABLE_COLOR;
    this.lifeSpan = VEGETABLE_LIFE_SPAN+random(VEGETABLE_LIFE_SPAN);
    this.life = 0;
}

Vegetable.prototype.render = function(){
    App.canvas.drawPixel(this.position, this.color);
};

Vegetable.prototype.update = function(){
    this.life += 1;

    if(this.life < this.lifeSpan){
        if(this.life%VEGETABLE_SEEDING_CYCLE === 0){
            this.spread();
        }
    }else{
        this.die();
    }
};

Vegetable.prototype.spread = function(){
    if(App.vegetables.length < (App.canvas.width*App.canvas.height)/3){
        let seeds = random(VEGETABLE_MAX_SEED);
        while(seeds > 0){
            App.vegetables.push(new Vegetable(App.canvas.getRandomPosition()));
            seeds -= 1;
        }
    }
}

Vegetable.prototype.die = function(){
    let key = App.vegetables.indexOf(this);
    App.vegetables.splice(key, 1);
};