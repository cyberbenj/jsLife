const MODAL = (() => {
    "use strict";

    function Modal(){}

    Modal.prototype.init = function(parent, id){
        this.parent = parent;
        this.id = id;

        let modal = dom("div", {"id": id, "class": "modal"});
        this.parent.append(modal);

        modal.append(
            dom("div", {"id": id+"-modal-background", "class": "modal-background"}),
            dom("div", {"id": id+"-modal-content", "class": "modal-content"}),
            dom("button", {"id": id+"-modal-close" ,"class": "modal-close is-large", "aria-label": "close"}, {
                "click": (element) => {
                    APP.stop();
                }
            })
        );
    };

    Modal.prototype.get = function(component = ""){
        let id = (component !== "") ? this.id+"-modal-"+component : this.id;
        let element = document.getElementById(id);
        return element;
    };

    Modal.prototype.show = function(){
        this.get().className = "modal is-active";
    };

    Modal.prototype.hide = function(){
        this.get().className = "modal";
    };

    return new Modal();
})();