"use strict";

// TODO : different rng_seed for vegetables, carnivorous, hebrivorous
// replace all constants named ANIMAL_xxx 

const REAL_RANDOM = false;
const CANVAS_WIDTH = 64;
const CANVAS_HEIGHT = 64;

const CANVAS_BACKGROUD_COLOR = [255, 255, 255];
const VEGETABLE_COLOR = [0, 255, 0];
const CARNIVOROUS_COLOR = [255, 0, 0];
const HERBIVOROUS_COLOR = [0, 0, 255];

const VEGETABLES_SPAWN = 20;
const HERBIVOROUS_SPAWN = 5;
const CARNIVOROUS_SPAWN = 2;

const VEGETABLE_LIFE_SPAN = 1000;
const VEGETABLE_SEEDING_CYCLE = 500;
const VEGETABLE_MAX_SEED = 2;

const ANIMAL_LIFE_SPAN = 1000;
const ANIMAL_BREEDING_CYCLE = 500;
const ANIMAL_MAX_BROOD = 2;
const ANIMAL_MAX_HEALTH = 400;
const ANIMAL_FIELD_OF_VIEW = 8;

const CARNIVOROUS_LIFE_SPAN = 1000;
const CARNIVOROUS_MAX_HEALTH = 400;
const CARNIVOROUS_FOOD_HEALTH = 400;
const CARNIVOROUS_BREEDING_CYCLE = 500;
const CARNIVOROUS_MAX_BROOD = 2;
const CARNIVOROUS_FIELD_OF_VIEW = 8;

const HERBIVOROUS_LIFE_SPAN = 1000;
const HERBIVOROUS_MAX_HEALTH = 400;
const HERBIVOROUS_FOOD_HEALTH = 400;
const HERBIVOROUS_BREEDING_CYCLE = 500;
const HERBIVOROUS_MAX_BROOD = 2;
const HERBIVOROUS_FIELD_OF_VIEW = 8;

let rng_seed = 1;

function rng(){
    let x = Math.sin(rng_seed++)*10000;
    return x - Math.floor(x);
}

function random(max){
    let x = (REAL_RANDOM) ? Math.random()*max : rng()*max;
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
        this.canvas = null;
        this.vegetables = [];
        this.animals = [];
    }
    
    App.prototype.init = function(){
        document.title = this.name;
        this.canvas = new Canvas(document.body, "canvas", CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_BACKGROUD_COLOR);

        let vegetablesSpawn = VEGETABLES_SPAWN;
        while(vegetablesSpawn > 0){
            this.vegetables.push(new Vegetable(this.canvas.getRandomPosition()));
            vegetablesSpawn -= 1;
        }
        
        let carnivorousSpawn = CARNIVOROUS_SPAWN;
        while(carnivorousSpawn > 0){
            this.animals.push(new Animal(this.canvas.getRandomPosition(), true));
            carnivorousSpawn -= 1;
        }

        let herbivorousSpawn = HERBIVOROUS_SPAWN;
        while(herbivorousSpawn > 0){
            this.animals.push(new Animal(this.canvas.getRandomPosition(), false));
            herbivorousSpawn -= 1;
        }

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