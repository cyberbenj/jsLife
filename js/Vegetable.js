"use strict";

function Vegetable(position){
    this.position = position;
    this.life = VEGETABLE_MAX_LIFE+random(VEGETABLE_MAX_LIFE);
    this.color = VEGETABLE_COLOR;
}

Vegetable.prototype.render = function(){
    App.canvas.drawPixel(this.position, this.color);
};

Vegetable.prototype.update = function(){
    this.life -= 1;

    if(this.life > 0){
        this.spread();
    }else{
        this.die();
    }
};

Vegetable.prototype.spread = function(){
	
}

Vegetable.prototype.die = function(){
    //App.animals.push(new Animal({x: this.position.x, y: this.position.y}, (random(1) === 1) ));
    let key = App.vegetables.indexOf(this);
    App.vegetables.splice(key, 1);
};