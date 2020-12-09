"use strict";

const CANVAS_WIDTH = 64;
const CANVAS_HEIGHT = 64;

const CANVAS_BACKGROUD_COLOR = [255, 255, 255];
const VEGETABLE_COLOR = [0, 255, 0];
const ANIMAL_CARNIVOROUS_COLOR = [255, 0, 0];
const ANIMAL_HERBIVOROUS_COLOR = [0, 0, 255];

const NB_VEGETABLES = 200;
const VEGETABLE_LIFE_SPAN = 1000;
const VEGETABLE_SEEDING_CYCLE = 500;
const VEGETABLE_MAX_SEED = 2;

const NB_HERBIVOROUS = 20;
const NB_CARNIVOROUS = 10;
const ANIMAL_LIFE_SPAN = 1000;
const ANIMAL_BREEDING_CYCLE = 500;
const ANIMAL_MAX_BROOD = 2;
const ANIMAL_MAX_HEALTH = 400;
const ANIMAL_FIELD_OF_VIEW = 8;

function random(max){
    return Math.round(Math.random()*max);
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

        let nbVegetables = NB_VEGETABLES;
        while(nbVegetables > 0){
            this.vegetables.push(new Vegetable(this.canvas.getRandomPosition()));
            nbVegetables -= 1;
        }
        
        let nbCarnivorous = NB_CARNIVOROUS;
        while(nbCarnivorous > 0){
            this.animals.push(new Animal(this.canvas.getRandomPosition(), true));
            nbCarnivorous -= 1;
        }

        let nbHerbivorous = NB_HERBIVOROUS;
        while(nbHerbivorous > 0){
            this.animals.push(new Animal(this.canvas.getRandomPosition(), false));
            nbHerbivorous -= 1;
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