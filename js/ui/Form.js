const FORM = (() => {
    "use strict";

    function Form(){}

    Form.prototype.init = function(parent, id){
        this.parent = parent;
        this.id = id;
        
        let form = dom("form", {"id": this.id, "class": "container"});
        parent.append(form);

        form.append(
            dom("h1", {"class": "title", "textContent": APP.name}),
            dom("h2", {"class": "subtitle", "textContent": APP.description}),
            dom("a", {"class": "button is-primary", "textContent": "start".i18n()}, {
                "click": () => APP.start()
            })
        );

        let tabs = dom("div", {"id": "tabs", "class": "tabs"});
        form.append(tabs);

        let ul = dom("ul");
        tabs.append(ul);

        let tabId = 0;
        let settings = Object.keys(SETTINGS);
        for(let setting of settings){
            if(setting !== "canvas"){

                let tabClass = (tabId === 0) ? "tab is-active" : "tab";
                let tab = dom("li", {"class": tabClass, "tab-id": tabId}, {
                    "click": (element) => this.setTab(element.getAttribute("tab-id"))
                });
                ul.append(tab);

                let a = dom("a", {"textContent": setting.i18n()});
                tab.append(a);
                
                let tabContentClass = (tabId === 0) ? "content tab-content" : "content tab-content is-hidden";
                let tabContent = dom("div", {"class": tabContentClass, "tab-id": tabId});
                form.append(tabContent);
                
                let subSettings = Object.keys(SETTINGS[setting]);
                for(let subSetting of subSettings){
                    if(subSetting !== "color"){
                        tabContent.append(this.initField(setting, subSetting));
                    }
                }
                
                tabId += 1;
            }
        }

        let random_checkbox = document.getElementById("input-main-random");
        random_checkbox.addEventListener("change", () => {
            checkRandom();
        });

        function checkRandom(){
            let rng_seed_input = document.getElementById("input-main-rng_seed");
            let field = rng_seed_input.parentElement.parentElement;
            field.style.display = (random_checkbox.checked) ? "none" : "";
        }

        checkRandom();
    };

    Form.prototype.setTab = function(id){
        let tabs = document.getElementsByClassName("tab");
        for(let tab of tabs){
            let tabClass = (tab.getAttribute("tab-id") === id) ? "tab is-active" : "tab";
            tab.setAttribute("class", tabClass);
        }

        let contents = document.getElementsByClassName("tab-content");
        for(let content of contents){
            let contentClass = (content.getAttribute("tab-id") === id) ? "content tab-content" : "content tab-content is-hidden";
            content.setAttribute("class", contentClass);
        }
    };

    Form.prototype.initField = function(setting, subSetting){
        let settingValue = SETTINGS[setting][subSetting];
        let settingType = typeof settingValue;
        let inputType = (settingType === "boolean") ? "checkbox" : "tel";
        let inputId = "input-"+setting+"-"+subSetting;

        let field = dom("div", {"class": "field"});

        switch(inputType){
            case "checkbox":
                var control = dom("div", {"class": "control"});
                field.append(control);
            
                var label = dom("label", {"class": "checkbox"});
                field.append(label);

                label.append(
                    dom("input", {"type": "checkbox", "id": inputId, "checked": SETTINGS[setting][subSetting]}, {
                        "change": (element) => SETTINGS[setting][subSetting] = element.checked
                    }),
                    dom("text", {"textContent": " "+subSetting.i18n()})
                );
                control.append(label);
            break;

            default:
                var label = dom("label", {"class": "label", "textContent": subSetting.i18n(), "for": inputId});
                field.append(label);

                var control = dom("div", {"class": "control"});
                field.append(control);

                control.append(
                    dom("input", {"type": inputType, "class": "input", "id": inputId, "value": settingValue}, {
                        "change": (element) => {
                            element.value = absInt(element.value);
                            SETTINGS[setting][subSetting] = parseInt(element.value);
                        }
                    })
                );
            break;
        }

        return field;
    };

    Form.prototype.get = function(){
        let form = document.getElementById(this.id);
        return form;
    };

    return new Form();
})();