"use strict";

const CANVAS_WIDTH = 128;
const CANVAS_HEIGHT = 128;

const CANVAS_BACKGROUD_COLOR = [255, 255, 255];
const VEGETABLE_COLOR = [0, 255, 0];
const ANIMAL_CARNIVOROUS_COLOR = [255, 0, 0];
const ANIMAL_HERBIVOROUS_COLOR = [0, 0, 255];

const VEGETABLE_LIFE_SPAN = 200;
const VEGETABLE_SEEDING_CYCLE = 180;
const VEGETABLE_MAX_SEED = 2;

const ANIMAL_LIFE_SPAN = 200;
const ANIMAL_BREEDING_CYCLE = 220;
const ANIMAL_MAX_BROOD = 2;

/*
    generate random number of vegetables

    - animal get target only if in fov
    - if target leaves fov, animal target is null
    - if target is reached, target die

*/

function random(max){
    return Math.round(Math.random()*max);
}

function distance(start, end){
    return Math.floor(Math.hypot(end.x-start.x, end.y-start.y));
}

function radian(start, end){
    return Math.atan2(end.y-start.y, end.x-start.x);
}

const App = (() => {

    function App(){
        this.name = "jsLife";
        this.canvas = null;
        this.vegetables = [];
        this.animals = [];
    }
    
    App.prototype.init = function(){
        document.title = this.name;
        this.canvas = new Canvas(document.body, "canvas", CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_BACKGROUD_COLOR);
        this.vegetables.push(new Vegetable(this.canvas.getRandomPosition()));
        //this.animals.push(new Animal(this.canvas.getRandomPosition(), true));

        let max = 50;
        while(max > 0){
            //this.animals.push(new Animal(this.canvas.getRandomPosition(), true));
            this.animals.push(new Animal(this.canvas.getRandomPosition(), (random(1) === 1)));
            max -= 1;
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