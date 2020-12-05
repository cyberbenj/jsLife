function App(name){
    this.name = name;
}

App.prototype.init = function(){
    console.log("ok");
};

export new App();