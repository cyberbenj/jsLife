const APP = (() => {
    "use strict";
    
    function App(){
        this.name = "jsLife";
        this.description = "a sim about life and death.";
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

    };

    App.prototype.stop = function(){
        cancelAnimationFrame(this.requestAnimationFrame);

        //this.chart.render();
        this.reset();
        MODAL.hide();
    };

    App.prototype.reset = function(){
        this.vegetables = [];
        this.animals = [];

        this.chart.reset();
        this.time = 0;
    };

    App.prototype.start = function(){
        rng_seed = SETTINGS.main.rng_seed;
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
        this.timer = 0;
        this.run();
    };

    App.prototype.start__ = function(){
        fetch('https://quickchart.io/chart/create', {
            method: 'post', headers: {'Content-Type': 'application/json'},
            body: '{"chart": {"type": "bar", "data": {"labels": ["Hello", "World"], "datasets": [{"label": "Foo", "data": [1, 2]}]}}}'
        })
        .then(res => res.json())
        .then(res => window.open(res.url, "_blank")); // warning : this is bad because it needs user to accept all popups to work... 
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
    let app = document.getElementById("app");
    FORM.init(app, "form");
    MODAL.init(document.body, "app-modal");
    CANVAS.init(MODAL.get(), "canvas", SETTINGS.canvas);
    APP.init();
};