const APP = (() => {
    "use strict";
    
    function App(){
        this.name = "jsLife";
        this.description = "app-description".i18n();
        this.requestAnimationFrame = null;
        this.vegetables = [];
        this.animals = [];

        this.vegetablesCount = 0;
        this.herbivorousCount = 0;
        this.carnivorousCount = 0;

        this.timer = 0;
        this.time = 0;

        this.chart = new Chart("line", [
            {label: "vegetables", color: rgb(SETTINGS.vegetable.color)},
            {label: "herbivorous", color: rgb(SETTINGS.herbivorous.color)},
            {label: "carnivorous", color: rgb(SETTINGS.carnivorous.color)}
        ]);
    }

    App.prototype.init = function(){
        document.title = this.name;
        let app = document.getElementById("app");
        FORM.init(app, "form");
        MODAL.init(document.body, "app-modal");
        CANVAS.init(MODAL.get("card-body"), "canvas", SETTINGS.canvas);
    };

    App.prototype.stop = function(){
        cancelAnimationFrame(this.requestAnimationFrame);

        MODAL.get("stop-button").classList.add("is-loading");
        this.chart.render((res) => {
            let chart = MODAL.get("chart-img");
            chart.src = res.url;
            chart.onload = () => {
                CANVAS.hide();
                MODAL.show("chart-img");
                MODAL.get("stop-button").classList.remove("is-loading");
                MODAL.hide("stop-button");
                MODAL.show("restart-button");
            };
        }); 
    };

    App.prototype.close = function(){
        cancelAnimationFrame(this.requestAnimationFrame);
        MODAL.hide();
    };

    App.prototype.reset = function(){
        this.vegetables = [];
        this.animals = [];
        this.chart.reset();
        this.time = 0;
        this.timer = 0;
        rng_seed = SETTINGS.main.rng_seed;
        
        CANVAS.show();
        MODAL.hide("chart-img");
        MODAL.hide("restart-button");
        MODAL.show("stop-button");
    };

    App.prototype.start = function(){
        this.reset();
        MODAL.show();
        
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

        this.updateChart();
        this.run();
    };
    
    App.prototype.updateChart = function(){
        let vegetables = this.vegetables.length;
        let herbivorous = 0;
        let carnivorous = 0;

        for(let animal of this.animals){
            if(animal.isCarnivorous){
                carnivorous += 1;
            }else herbivorous += 1;
        }

        this.chart.update(this.time, [vegetables, herbivorous, carnivorous]);
    };

    App.prototype.update = function(up){
        let entities = this.vegetables.concat(this.animals);
        for(let entity of entities){
            entity.update(up);
        }
    };

    App.prototype.render = function(){
        CANVAS.clear();

        let entities = this.vegetables.concat(this.animals);
        for(let entity of entities){
            entity.render();
        }
    };

    App.prototype.run = function(now){
        this.requestAnimationFrame = requestAnimationFrame((now) => this.run(now));

        let up = false;
        if(now-this.timer >= 1000){
            this.timer = now;
            this.time += 1;
            up = true;
        }

        this.update(up);
        this.render();

        if(up) this.updateChart();        
    };

    App.prototype.random = function(max){
        let x = (SETTINGS.main.random) ? Math.random()*max : rng()*max;
        return Math.round(x);
    };

    return new App();
})();

window.onload = () => {
    APP.init();
};