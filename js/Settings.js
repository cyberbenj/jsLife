const SETTINGS = (() => {
    "use strict";
    
    function Settings(){
        this.main = {
            random: false,
            rng_seed: 0
        };
        this.canvas = {
            color: [255, 255, 255],
            width: 64,
            height: 64
        };
        this.vegetable = {
            color: [0, 255, 0],
            spawn: 5,
            death: 1000,
            seeding: 700,
            seeds: 2
        };
        this.herbivorous = {
            color: [0, 0, 255],
            spawn: 2,
            death: 1000,
            health: 200,
            hungry: 200,
            breeding: 500,
            broods: 2,
            FOV: 8,
            speed: 5
        };
        this.carnivorous = {
            color: [255, 0, 0],
            spawn: 1,
            death: 1000,
            health: 200,
            hungry: 200,
            breeding: 700,
            broods: 2,
            FOV: 8,
            speed: 5
        };
    }

    return new Settings();
})();