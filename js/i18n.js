"use strict";

let lang = (window.location.hash) ? window.location.hash.substring(1) : "en";
String.prototype.i18n = function(){
    let exists = (typeof LOCALE[lang] !== "undefined" && typeof LOCALE[lang][this] !== "undefined");
    return (exists) ? LOCALE[lang][this] : this;
};

const LOCALE = {
    "en": {
        "app-description": "a basic sim about life and death.",
        "start": "Start",
        "main": "Main",
        "random": "Random",
        "rng_seed": "RNG Seed",
        "vegetable": "Vegetable",
        "spawn": "Spawn quantity",
        "death": "Lifetime (seconds)",
        "seeding": "Seeding cycle (seconds)",
        "seeds": "Seeds quantity"
    }
};