"use strict";

function Vegetable(position){
    this.position = position;
    this.life = VEGETABLE_MAX_LIFE+Math.round(Math.random()*VEGETABLE_MAX_LIFE);;
    this.color = VEGETABLE_COLOR;
    this.canSpread = false;
}

Vegetable.prototype.render = function(){
    App.canvas.drawPixel(this.position, this.color);
};

Vegetable.prototype.update = function(){
    this.life -= 1;

    if(this.life > 0){
        if(this.life <= VEGETABLE_MAX_LIFE/2 && this.canSpread){
           // things to do ?
        }
    }else{
        this.die();
    }
};

Vegetable.prototype.die = function(){
    
    // TODO : do it random
    App.animals.push(new Animal({x: this.position.x, y: this.position.y}, (Math.round(Math.random()) === 1) ));
    App.animals.push(new Animal({x: this.position.x, y: this.position.y}, (Math.round(Math.random()) === 1) ));

    let key = App.vegetables.indexOf(this);
    App.vegetables.splice(key, 1);
};