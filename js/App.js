"use strict";

const CANVAS_WIDTH = 100;
const CANVAS_HEIGHT = 100;

const CANVAS_BACKGROUD_COLOR = [255, 255, 255];
const VEGETABLE_COLOR = [0, 255, 0];
const ANIMAL_CARNIVOROUS_COLOR = [255, 0, 0];
const ANIMAL_HERBIVOROUS_COLOR = [0, 0, 255];

const VEGETABLE_LIFE = 200;
const ANIMAL_LIFE = 200;

function random(max){
    return Math.round(Math.random()*max);
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
        this.animals.push(new Animal(this.canvas.getRandomPosition(), false));
        this.animals.push(new Animal(this.canvas.getRandomPosition(), true));

        this.loop();
    };

    App.prototype.update = function(){
        if(this.vegetables.length > 0){
            this.vegetables.push(new Vegetable(this.canvas.getRandomPosition()));
        }
        
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