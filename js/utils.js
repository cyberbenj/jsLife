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

function addInput(parent, name, type, value, events = null){
    let checkbox = (type === "checkbox");

    let field = document.createElement("div");
    field.className = (checkbox) ? "field for-checkbox" : "field";
    parent.append(field);

    if(type !== "button"){
        let label = document.createElement("label");
        label.innerHTML = name;
        label.htmlFor = "input_"+name;
        field.append(label);
    }
    
    let input = document.createElement("input");
    input.id = "input_"+name;
    input.type = type;
    if(checkbox){
        input.checked = value;
    }else input.value = value;

    /*if(type === "tel"){
        input.onchange = () => {
            input.value = input.value.replace(/[^\d]/g, "");
        };
    }*/

    if(events !== null){
        for(let event of Object.keys(events)){
            input.addEventListener(event, () => {
                events[event](input);
            });
        }
    }

    field.append(input);
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