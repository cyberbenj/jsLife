"use strict";

let App = (() => {
    function App(){
        this.name = "jsLife";
        this.settings = {
            main: {
                random: false
            },
            canvas: {
                width: 64,
                height: 64,
                backgroundColor: [255, 255, 255]
            },
            vegetable: {
                color: [0, 255, 0],
                spawn: 10,
                death: 1000,
                seeding: 700,
                seeds: 2
            },
            herbivorous: {
                color: [0, 0, 255],
                spawn: 10,
                death: 1000,
                health: 500,
                hunger: 250,
                breeding: 700,
                broods: 2,
                FOV: 16
            },
            carnivorous: {
                color: [255, 0, 0],
                spawn: 10,
                death: 1000,
                health: 500,
                hunger: 250,
                breeding: 700,
                broods: 2,
                FOV: 16
            }
        };
        this.canvas = null;
        this.vegetables = [];
        this.animals = [];
    }

    App.prototype.showSettings = function(){
        let form = dom("form", {"id": "form"});
        form.append(
            dom("input", {"type": "button", "value": "start !"}, {
                "click": () => {
                    this.start();
                }
            })
        );

        let settings = Object.keys(this.settings);
        for(let setting of settings){
            let type = typeof this.settings[setting];

            if(type !== "object") form.append(this.settingField(setting));
            if(type === "object" && setting !== "canvas"){
                let fieldset = dom("fieldset");
                fieldset.append(dom("legend", {"textContent": setting}));
                
                let subSettings = Object.keys(this.settings[setting]);
                for(let subSetting of subSettings){
                    if(subSetting !== "color"){
                        fieldset.append(this.settingField(setting, subSetting));
                    }
                }
                form.append(fieldset);
            }
        }
        
        document.body.append(form);
    };

    App.prototype.settingField = function(setting, subSetting){
        let settingValue = this.settings[setting][subSetting];
        let settingType = typeof settingValue;
        let inputType = (settingType === "boolean") ? "checkbox" : "tel";
        let inputId = "input-"+setting+"-"+subSetting;

        let field = dom("div", {"class": "field"});
        field.append(
            dom("label", {"textContent": subSetting, "for": inputId}),
            dom("input", {"type": inputType, "id": inputId, "value": settingValue}, {
                "change": (element) => {
                    if(inputType === "tel") element.value = element.value.replace(/[^\d]/g, "");
                    this.settings[setting][subSetting] = (inputType === "checkbox") ? element.checked : parseInt(element.value);
                }
            })
        );
        return field;
    };
    
    App.prototype.init = function(){
        document.title = this.name;
        this.showSettings();
    };

    App.prototype.start = function(){
        document.getElementById("form").style.display = "none";
        
        let canvasSettings = this.settings.canvas;
        this.canvas = new Canvas(document.body, "canvas", canvasSettings.width, canvasSettings.height, canvasSettings.backgroundColor);
        
        let vegetablesSpawn = this.settings.vegetable.spawn;
        while(vegetablesSpawn > 0){
            this.vegetables.push(new Vegetable(this.canvas.getRandomPosition(), this.settings.vegetable));
            vegetablesSpawn -= 1;
        }

        let herbivorousSpawn = this.settings.herbivorous.spawn;
        while(herbivorousSpawn > 0){
            this.animals.push(new Animal(this.canvas.getRandomPosition(), false, this.settings.herbivorous));
            herbivorousSpawn -= 1;
        }
        
        let carnivorousSpawn = this.settings.carnivorous.spawn;
        while(carnivorousSpawn > 0){
            this.animals.push(new Animal(this.canvas.getRandomPosition(), true, this.settings.carnivorous));
            carnivorousSpawn -= 1;
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

    App.prototype.random = function(max){
        let x = (this.settings.main.random) ? Math.random()*max : rng()*max;
        return Math.round(x);
    };

    return new App();
})();

window.onload = () => {
    App.init();
};