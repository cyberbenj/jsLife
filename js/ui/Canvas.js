const CANVAS = (() => {
    "use strict";

    function Canvas(){}
    
    Canvas.prototype.init = function(parent, id, settings){
        this.parent = parent;
        this.id = id;
        this.width = settings.width;
        this.height = settings.height;
        this.backgroundColor = settings.color;
        
        let canvas = dom("canvas", {"id": "canvas", "width": this.width, "height": this.height}, {
            "click": (element) => {
                APP.stop();
            }
        });
        this.parent.append(canvas);
    };
    
    Canvas.prototype.get = function(){
        let canvas = document.getElementById(this.id);
        return canvas;
    };
    
    Canvas.prototype.zoom = function(){
        let maxWidth = Math.floor(window.innerWidth/this.width);
        let maxHeight = Math.floor(window.innerHeight/this.height);
        let zoom = Math.max(Math.min(maxWidth, maxHeight), 1);
        this.get().style.transform = "scale("+zoom+")";
    };

    Canvas.prototype.resize = function(settings){
        this.width = settings.width;
        this.height = settings.height;
        
        let canvas = this.get();
        canvas.width = this.width;
        canvas.height = this.height;
    };
    
    Canvas.prototype.clear = function(){
        let ctx = this.get().getContext("2d");
        ctx.fillStyle = "rgb("+this.backgroundColor.join(", ")+")";
        ctx.fillRect(0, 0, this.width, this.height);
    };
    
    Canvas.prototype.drawPixel = function(position, color){
        let ctx = this.get().getContext("2d");
        let pixel = ctx.createImageData(1, 1);
        let data = pixel.data;
        data[0] = color[0];
        data[1] = color[1];
        data[2] = color[2];
        data[3] = 255;
        ctx.putImageData(pixel, position[0], position[1]);
    };
    
    Canvas.prototype.getPixel = function(position){
        let ctx = this.get().getContext("2d");
        let data = ctx.getImageData(position[0], position[1], 1, 1).data;
        return [data[0], data[1], data[2]];
    };
    
    Canvas.prototype.getRandomPosition = function(){
        return [APP.random(this.width), APP.random(this.height)];
    };
    
    Canvas.prototype.isOut = function(position){
        return (position[1] < 0 || position[1] >= this.height || position[0] < 0 || position[0] >= this.width);
    };

    return new Canvas();
})();