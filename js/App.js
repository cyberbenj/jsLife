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

        /*let chart = {
            type: "outlabeledPie",
            data: {
                labels: ["vegetables", "herbivorous", "carnivorous"],
                datasets: [{
                    backgroundColor: [
                        "rgb("+SETTINGS.vegetable.color.join(", ")+")",
                        "rgb("+SETTINGS.herbivorous.color.join(", ")+")",
                        "rgb("+SETTINGS.carnivorous.color.join(", ")+")"
                    ],
                    data: [this.vegetablesCount, this.herbivorousCount, this.carnivorousCount]
                }]
            },
            options: {
                plugins: {
                    legend: false,
                    outlabels: {
                        text: "%l %p",
                        color: "white"
                    }
                }
            }
        };*/

        /*
        let chart = {
            type: "doughnut",
            data: {
                labels: ["vegetables", "herbivorous", "carnivorous"],
                datasets: [{
                    backgroundColor: [
                        "rgb("+SETTINGS.vegetable.color.join(", ")+")",
                        "rgb("+SETTINGS.herbivorous.color.join(", ")+")",
                        "rgb("+SETTINGS.carnivorous.color.join(", ")+")"
                    ],
                    data: [this.vegetablesCount, this.herbivorousCount, this.carnivorousCount]
                }]
            },
            options: {
                plugins: {
                    doughnutlabel: {
                        labels: [
                            {text: (this.vegetablesCount+this.herbivorousCount+this.carnivorousCount), font: {size: 20}},
                            {text: "total"}
                        ]
                    }
                }
            }
        };
        */

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

        this.countLives();
        /*this.timer = setInterval(() => {
            this.time += 1;
            this.countLives();
        },1000);*/
        
        //this.time_ = performance.now();
        this.time_ = 0;
        this.run();
    };

    App.prototype.countLives = function(){
        let vegetables = this.vegetables.length;
        let herbivorous = 0;
        let carnivorous = 0;

        for(let animal of this.animals){
            if(animal.isCarnivorous){
                carnivorous += 1;
            }else herbivorous += 1;
        }

        this.chartData.labels.push(this.time);
        this.chartData.datasets[0].data.push(vegetables);
        this.chartData.datasets[1].data.push(herbivorous);
        this.chartData.datasets[2].data.push(carnivorous);
    };

    App.prototype.update = function(up){
        let entities = this.vegetables.concat(this.animals);
        for(let entity of entities){
            entity.update(up);
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

    App.prototype.run = function(now){
        this.requestAnimationFrame = requestAnimationFrame((now) => this.run(now));
        //this.update();
        //this.render();
        //console.log(now);



        //let last = Math.trunc(this.time_)/1000;
        //let now = Math.trunc((performance.now()-this.time_)/1000);

        /*if(last-now === 1){
            console.log(now);
        }*/
        //console.log(now);

        //console.log(Math.trunc((performance.now()-this.time_)/1000));
        
        let up = false;
        
        if(now-this.time_ >= 1000){
            this.time_ = now;
            this.time += 1;

            this.countLives();
            up = true;
        }

        this.update(up);
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