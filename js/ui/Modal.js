const MODAL = (() => {
    "use strict";

    function Modal(){}

    Modal.prototype.init = function(parent, id){
        this.parent = parent;
        this.id = id;

        let cardHeader = dom("header", {"class": "modal-card-head"});
        cardHeader.append(
            dom("p", {"class": "modal-card-title", "textContent": "jsLife"}),
            dom("button", {"class": "delete", "aria-label": "close"}, {
                "click": () => APP.close()
            })
        );

        let cardBody = dom("section", {"id": id+"-modal-card-body", "class": "modal-card-body"});
        cardBody.append(
            dom("img", {"id": id+"-modal-chart-img", "class": "is-hidden"})
        );

        let cardFooter = dom("footer", {"class": "modal-card-foot"});
        cardFooter.append(
            dom("button", {"id": id+"-modal-stop-button", "class": "button is-danger", "textContent": "stop".i18n()}, {
                "click": () => APP.stop()
            }),
            dom("button", {"id": id+"-modal-restart-button", "class": "button is-primary is-hidden", "textContent": "restart".i18n()}, {
                "click": () => {
                    APP.close();
                    APP.start();
                }
            }),
            dom("button", {"class": "button", "textContent": "cancel".i18n()}, {
                "click": () => APP.close()
            })
        );

        let card = dom("div", {"id": id+"-modal-card", "class": "modal-card"});
        card.append(cardHeader, cardBody, cardFooter);
        
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