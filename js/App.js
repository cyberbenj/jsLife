"use strict";

const App = (() => {

    function App(){
        this.name = "jsLife";
        this.canvas = null;
        this.vegetables = [];
    }
    
    App.prototype.init = function(){
        document.title = this.name;
        this.canvas = new Canvas(document.body, "canvas", 100, 100);
        this.loop();
    };

    App.prototype.update = function(){
        let rnd = (Math.round(Math.random()*10) === 5);
        if(rnd){
            this.vegetables.push(new Vegetable(this.canvas.getRandomPosition()));
        }

        for(let key in this.vegetables){
            let vegetable = this.vegetables[key];

            vegetable.life -= 1;

            if(vegetable.life === 0){
                this.vegetables.splice(key, 1);
            }
        }
    };

    App.prototype.render = function(canvas){
        canvas.zoom();
        canvas.clear();

        for(let vegetable of this.vegetables){
            vegetable.render(canvas);
        }
    };

    App.prototype.loop = function(){
        requestAnimationFrame(() => this.loop());
        this.update();
        this.render(this.canvas);
    };

    return new App();
})();

window.onload = () => {
    App.init();
};