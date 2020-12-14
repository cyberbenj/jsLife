const APP = (() => {
    "use strict";
    
    function App(){
        this.name = "jsLife";
        this.requestAnimationFrame = null;
        this.vegetables = [];
        this.animals = [];

        this.vegetablesCount = 0;
        this.herbivorousCount = 0;
        this.carnivorousCount = 0;

        this.timer = null;
        this.time = 0;

        this.chartData = {
            labels: [],
            datasets : [
                {label: "vegetables", fill: false, borderColor: "rgb("+SETTINGS.vegetable.color.join(", ")+")", data: []},
                {label: "herbivorous", fill: false, borderColor: "rgb("+SETTINGS.herbivorous.color.join(", ")+")", data: []},
                {label: "carnivorous", fill: false, borderColor: "rgb("+SETTINGS.carnivorous.color.join(", ")+")", data: []}
            ]
        };
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
        clearInterval(this.timer);

        //let chart = {type: "bar", data: this.chartData};
        let chart = {type: "line", data: this.chartData};
        let json = JSON.stringify(chart);
        let quickchart = window.open("https://quickchart.io/chart?c="+encodeURI(json), "_blank");
        quickchart.focus();

        this.reset();
        this.showForm();
    };

    App.prototype.reset = function(){
        this.vegetables = [];
        this.animals = [];
        
        this.vegetablesCount = 0;
        this.herbivorousCount = 0;
        this.carnivorousCount = 0;

        this.chartData = {
            labels: [],
            datasets : [
                {label: "vegetables", fill: false, borderColor: "rgb("+SETTINGS.vegetable.color.join(", ")+")", data: []},
                {label: "herbivorous", fill: false, borderColor: "rgb("+SETTINGS.herbivorous.color.join(", ")+")", data: []},
                {label: "carnivorous", fill: false, borderColor: "rgb("+SETTINGS.carnivorous.color.join(", ")+")", data: []}
            ]
        };

        this.timer = null;
        this.time = 0;
    };

    App.prototype.start = function(){
        rng_seed = SETTINGS.main.rng_seed;
        this.vegetablesCount = SETTINGS.vegetable.spawn;
        this.herbivorousCount = SETTINGS.herbivorous.spawn;
        this.carnivorousCount = SETTINGS.carnivorous.spawn;

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

        this.timer = setInterval(() => {
            this.time += 1;
            //console.log(this.time);

            this.chartData.labels.push(this.time); // start before setInterval !!! or it will count only after 1 second...
            this.chartData.datasets[0].data.push(this.vegetablesCount);
            this.chartData.datasets[1].data.push(this.herbivorousCount);
            this.chartData.datasets[2].data.push(this.carnivorousCount);

        },1000);
        
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