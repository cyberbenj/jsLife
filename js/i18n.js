"use strict";

let lang = (window.location.hash) ? window.location.hash.substring(1) : "en";
String.prototype.i18n = function(){
    let exists = (typeof LOCALE[lang] !== "undefined" && typeof LOCALE[lang][this] !== "undefined");
    return (exists) ? LOCALE[lang][this] : this;
};

const LOCALE = {
    "en": {
        "app-description": "A basic sim about life and death.",
        "start": "Start",
        "main": "Main",
        "vegetable": "Vegetable",
        "herbivorous": "Herbivorous",
        "carnivorous": "Carnivorous",
        "random": "Random",
        "rng_seed": "RNG Seed",
        "spawn": "Spawn quantity",
        "death": "Lifetime (seconds)",
        "seeding": "Seeding cycle (seconds)",
        "seeds": "Seeds quantity",
        "health": "Health cycle (seconds)",
        "hungry": "Hunger cycle (seconds)",
        "breeding": "Breeding cycle (seconds)",
        "broods": "Broods quantity",
        "FOV": "Field of view (pixels)",
        "speed": "Speed",
        "stop": "Stop",
        "cancel": "Cancel",
        "restart": "Restart",
        "vegetables": "Vegetables"
    }
};