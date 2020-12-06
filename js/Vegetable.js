"use strict";

function Vegetable(position){
    this.position = position;
    this.life = VEGETABLE_MAX_LIFE;
    this.color = VEGETABLE_COLOR;
}

Vegetable.prototype.render = function(){
    App.canvas.drawPixel(this.position, this.color);
};

Vegetable.prototype.update = function(){
    this.life -= 1;

    if(this.life > 0){
        if(this.life <= VEGETABLE_MAX_LIFE/2){
           // things to do ?
        }
    }else{
        this.die();
    }
};

Vegetable.prototype.die = function(){
    let key = App.vegetables.indexOf(this);

    // TODO : do it random
    App.animals.push(new Animal({x: this.position.x,y: this.position.y}, false));
    App.animals.push(new Animal({x: this.position.x,y: this.position.y}, false));
    App.animals.push(new Animal({x: this.position.x,y: this.position.y}, false));

    App.vegetables.splice(key, 1);
};