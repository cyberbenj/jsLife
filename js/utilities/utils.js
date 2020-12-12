"use strict";

let rng_seed = 1;

function rng(){
    let x = Math.sin(rng_seed++)*10000;
    return x - Math.floor(x);
}

function distance(start, end){
    return Math.floor(Math.hypot(end[0]-start[0], end[1]-start[1]));
}

function radian(start, end){
    return Math.atan2(end[1]-start[1], end[0]-start[0]);
}

function dom(type, attributes = null, events = null){
    let element = document.createElement(type);
    
    if(attributes !== null){
        for(let attribute of Object.keys(attributes)){
            switch(attribute){
                case "innerHTML": element.innerHTML = attributes[attribute]; break;
                case "textContent": element.textContent = attributes[attribute]; break;
                default: element.setAttribute(attribute, attributes[attribute]); break;
            }
        }
    }

    if(events !== null){
        for(let event of Object.keys(events)){
            element.addEventListener(event, () => {
                events[event](element);
            });
        }
    }

    return element;
}