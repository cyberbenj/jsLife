"use strict";

// TODO : different rng_seed for vegetables, carnivorous, herbivorous ?
let rng_seed = 1;
function rng(){
    let x = Math.sin(rng_seed++)*10000;
    return x - Math.floor(x);
}

function random(max){
    let x = (App.settings.random) ? Math.random()*max : rng()*max;
    return Math.round(x);
}

function distance(start, end){
    return Math.floor(Math.hypot(end[0]-start[0], end[1]-start[1]));
}

function radian(start, end){
    return Math.atan2(end[1]-start[1], end[0]-start[0]);
}

let App = (() => {
    function App(){
        this.name = "jsLife";
        this.settings = {
            random: false,
            canvas: {
                width: 64,
                height: 64,
                backgroundColor: [255, 255, 255]
            },
            vegetable: {
                color: [0, 255, 0],
                spawn: 10,
                death: 1000,
                seeding: 700,
                seeds: 2
            },
            herbivorous: {
                color: [0, 0, 255],
                spawn: 10,
                death: 1000,
                health: 500,
                hunger: 250,
                breeding: 700,
                broods: 2,
                fieldOfView: 16
            },
            carnivorous: {
                color: [255, 0, 0],
                spawn: 10,
                death: 1000,
                health: 500,
                hunger: 250,
                breeding: 700,
                broods: 2,
                fieldOfView: 16
            }
        };
        this.canvas = null;
        this.vegetables = [];
        this.animals = [];
    }
    
    App.prototype.init = function(){
        document.title = this.name;
        this.canvas = new Canvas(
            document.body,
            "canvas",
            this.settings.canvas.width,
            this.settings.canvas.height,
            this.settings.canvas.backgroundColor
        );
        
        let vegetablesSpawn = this.settings.vegetable.spawn;
        while(vegetablesSpawn > 0){
            this.vegetables.push(new Vegetable(this.canvas.getRandomPosition(), this.settings.vegetable));
            vegetablesSpawn -= 1;
        }

        let herbivorousSpawn = this.settings.herbivorous.spawn;
        while(herbivorousSpawn > 0){
            this.animals.push(new Animal(this.canvas.getRandomPosition(), false, this.settings.herbivorous));
            herbivorousSpawn -= 1;
        }
        
        let carnivorousSpawn = this.settings.carnivorous.spawn;
        while(carnivorousSpawn > 0){
            this.animals.push(new Animal(this.canvas.getRandomPosition(), true, this.settings.carnivorous));
            carnivorousSpawn -= 1;
        }

        /*
        let entities = [this.settings.vegetable, this.settings.herbivorous, this.settings.carnivorous];
        for(let entity of entities){
            let spawn = entity.spawn;
            console.log(entity);
        }
        */

		this.loop(); 
    };

    App.prototype.update = function(){
        let entities = this.vegetables.concat(this.animals);
        for(let entity of entities){
            entity.update();
        }
    };

    App.prototype.render = function(){
        this.canvas.zoom();
        this.canvas.clear();

        let entities = this.vegetables.concat(this.animals);
        for(let entity of entities){
            entity.render();
        }
    };

    App.prototype.loop = function(){
        requestAnimationFrame(() => this.loop());
        this.update();
        this.render();
    };

    return new App();
})();

window.onload = () => {
    App.init();
};