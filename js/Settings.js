const SETTINGS = (() => {
    "use strict";
    
    function Settings(){
        this.main = {
            random: false
        };
        this.canvas = {
            color: [255, 255, 255],
            width: 64,
            height: 64
        };
        this.vegetable = {
            color: [0, 255, 0],
            spawn: 10,
            death: 1000,
            seeding: 700,
            seeds: 2
        };
        this.herbivorous = {
            color: [0, 0, 255],
            spawn: 10,
            death: 1000,
            health: 500,
            hunger: 250,
            breeding: 700,
            broods: 2,
            FOV: 8
        };
        this.carnivorous = {
            color: [255, 0, 0],
            spawn: 10,
            death: 1000,
            health: 500,
            hunger: 250,
            breeding: 700,
            broods: 2,
            FOV: 8
        };
    }

    return new Settings();
})();