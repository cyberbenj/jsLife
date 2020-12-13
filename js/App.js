const APP = (() => {
    "use strict";
    
    function App(){
        this.name = "jsLife";
        this.requestAnimationFrame = null;
        this.vegetables = [];
        this.animals = [];
    }

    App.prototype.init = function(){
        document.title = this.name;
        this.showForm();
    };

    App.prototype.showForm = function(){
        CANVAS.get().style.display = "none";
        FORM.get().style.display = "";
    };

    App.prototype.stop = function(){
        cancelAnimationFrame(this.requestAnimationFrame);
        this.reset();
        this.showForm();
    };

    App.prototype.reset = function(){
        rng_seed = 1;
        this.vegetables = [];
        this.animals = [];
    };

    App.prototype.start = function(){
        FORM.get().style.display = "none";
        CANVAS.get().style.display = "";
        CANVAS.resize(SETTINGS.canvas);
        
        let entities = [{setting: "vegetable", object: "Vegetable"}, {setting: "herbivorous", object: "Animal"}, {setting: "carnivorous", object: "Animal"}];
        for(let entity of entities){
            let spawn = SETTINGS[entity.setting].spawn;
            while(spawn > 0){
                if(entity.object === "Animal"){
                    this.animals.push(new window[entity.object](CANVAS.getRandomPosition(), (entity.setting === "carnivorous"), SETTINGS[entity.setting]));
                }else this.vegetables.push(new window[entity.object](CANVAS.getRandomPosition(), SETTINGS[entity.setting]));
                spawn -= 1;
            }
        }
        
        this.run();
    };

    App.prototype.update = function(){
        let entities = this.vegetables.concat(this.animals);
        for(let entity of entities){
            entity.update();
        }
    };

    App.prototype.render = function(){
        CANVAS.zoom();
        CANVAS.clear();

        let entities = this.vegetables.concat(this.animals);
        for(let entity of entities){
            entity.render();
        }
    };

    App.prototype.run = function(){
        this.requestAnimationFrame = requestAnimationFrame(() => this.run());
        this.update();
        this.render();
    };

    App.prototype.random = function(max){
        let x = (SETTINGS.main.random) ? Math.random()*max : rng()*max;
        return Math.round(x);
    };

    return new App();
})();

window.onload = () => {
    CANVAS.init(document.body, "canvas", SETTINGS.canvas);
    FORM.init(document.body, "form");
    APP.init();
};