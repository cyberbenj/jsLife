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
    /*let directions = [
        {x: this.position.x, y: this.position.y-1},
        {x: this.position.x, y: this.position.y+1},
        {x: this.position.x-1, y: this.position.y},
        {x: this.position.x+1, y: this.position.y}
    ];

    let positions = [];
    for(let direction of directions){
        if(!App.canvas.isOut(direction)){
            if(App.canvas.getPixel(direction).join(", ") !== VEGETABLE_COLOR.join(", ")){
                positions.push(direction);
            }
        }
    }

    if(positions.length > 0){
        let rnd = random(positions.length-1);
        App.vegetables.push(new Vegetable({x: positions[rnd].x, y: positions[rnd].y}));
    }*/

    /*for(let i=0; i < random(2); i++){
        App.vegetables.push(new Vegetable(App.canvas.getRandomPosition()));
    }*/
    
    let seeds = random(VEGETABLE_MAX_SEED);
    while(seeds > 0){
        App.vegetables.push(new Vegetable(App.canvas.getRandomPosition()));
        seeds -= 1;
    }

    

}

Vegetable.prototype.die = function(){
    //App.animals.push(new Animal({x: this.position.x, y: this.position.y}, (random(1) === 1) ));
    let key = App.vegetables.indexOf(this);
    App.vegetables.splice(key, 1);
};