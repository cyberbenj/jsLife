const MODAL = (() => {
    "use strict";

    function Modal(){}

    Modal.prototype.init = function(parent, id){
        this.parent = parent;
        this.id = id;


        /*modal.append(
            dom("div", {"id": id+"-modal-background", "class": "modal-background"}),
            dom("div", {"id": id+"-modal-content", "class": "modal-content"}),
            dom("button", {"id": id+"-modal-close" ,"class": "modal-close is-large", "aria-label": "close"}, {
                "click": (element) => {
                    APP.stop();
                }
            })
        );*/
        
        let cardHeader = dom("header", {"class": "modal-card-head"});
        cardHeader.append(
            dom("p", {"class": "modal-card-title", "textContent": "sim ended"}),
            dom("button", {"class": "delete", "aria-label": "close"})
        );

        let cardFooter = dom("footer", {"class": "modal-card-foot"});
        cardFooter.append(
            dom("button", {"class": "button is-success", "textContent": "chart"}),
            dom("button", {"class": "button", "textContent": "exit"})
        );

        let card = dom("div", {"id": id+"-modal-card", "class": "modal-card is-hidden"});
        card.append(
            cardHeader,
            dom("section", {"class": "modal-card-body", "textContent": "you can view chart or exit"}),
            cardFooter
        );
        
        let modal = dom("div", {"id": id, "class": "modal"});
        modal.append(
            dom("div", {"id": id+"-modal-background", "class": "modal-background"}), 
            card
        );

        this.parent.append(modal);
    };

    Modal.prototype.get = function(component = ""){
        let id = (component !== "") ? this.id+"-modal-"+component : this.id;
        let element = document.getElementById(id);
        return element;
    };

    Modal.prototype.show = function(component = ""){
        this.get(component).classList.remove("is-hidden");
        this.get(component).classList.add("is-active");
    };

    Modal.prototype.hide = function(component = ""){
        this.get(component).classList.remove("is-active");
        this.get(component).classList.add("is-hidden");
    };

    return new Modal();
})();