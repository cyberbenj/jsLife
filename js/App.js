"use strict";

// TODO : different rng_seed for vegetables, carnivorous, herbivorous ?

const CANVAS_WIDTH = 64;
const CANVAS_HEIGHT = 64;
const CANVAS_BACKGROUD_COLOR = [255, 255, 255];

const RANDOM = true;

const VEGETABLE_COLOR = [0, 255, 0];
const CARNIVOROUS_COLOR = [255, 0, 0];
const HERBIVOROUS_COLOR = [0, 0, 255];

const VEGETABLES_SPAWN = 50;
const VEGETABLE_DEATH = 1000;
const VEGETABLE_SEEDING = 700;
const VEGETABLE_SEEDS = 2;

const HERBIVOROUS_SPAWN = 10;
const CARNIVOROUS_DEATH = 800;
const CARNIVOROUS_HEALTH = 200;
const CARNIVOROUS_HUNGER = 100;
const CARNIVOROUS_BREEDING = 500;
const CARNIVOROUS_BROODS = 3;
const CARNIVOROUS_FIELD_OF_VIEW = 16;

const CARNIVOROUS_SPAWN = 5;
const HERBIVOROUS_DEATH = 800;
const HERBIVOROUS_HEALTH = 400;
const HERBIVOROUS_HUNGER = 400;
const HERBIVOROUS_BREEDING = 500;
const HERBIVOROUS_BROODS = 2;
const HERBIVOROUS_FIELD_OF_VIEW = 16;

let rng_seed = 1;

function rng(){
    let x = Math.sin(rng_seed++)*10000;
    return x - Math.floor(x);
}

function random(max){
    let x = (RANDOM) ? Math.random()*max : rng()*max;
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