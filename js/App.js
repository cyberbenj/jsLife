function App(name){
    this.name = name;
}

App.prototype.init = function(){
    console.log("ok");
};

module.exports = new App();