const FORM = (() => {
    "use strict";

    function Form(){}

    Form.prototype.init = function(parent, id){
        this.parent = parent;
        this.id = id;
        
        //let form = dom("form", {"id": this.id});
        let form = dom("form", {"id": this.id, "class": "container"});
        form.append(
            //dom("input", {"type": "button", "value": "start !"}, {
            dom("a", {"class": "button is-primary", "textContent": "start !"}, {
                "click": () => {
                    APP.start();
                }
            })
        );
        
        let tabs = dom("div", {"id": "tabs"});
        form.append(tabs);
        
        let tabId = 0;
        let settings = Object.keys(SETTINGS);
        for(let setting of settings){
            if(setting !== "canvas"){
                if(tabId > 0) tabs.append(dom("span", {"class": "delimiter", textContent: "|"}));

                let tabClass = (tabId === 0) ? "tab active" : "tab";
                let tab = dom("span", {"class": tabClass, "textContent": setting, "tab-id": tabId}, {
                    "click": (element) => {
                        this.setTab(element.getAttribute("tab-id"));
                    }
                });
                tabs.append(tab);
                
                let tabContentClass = (tabId === 0) ? "tab-content active" : "tab-content";
                let tabContent = dom("div", {"class": tabContentClass, "tab-id": tabId});

                let subSettings = Object.keys(SETTINGS[setting]);
                for(let subSetting of subSettings){
                    if(subSetting !== "color"){
                        tabContent.append(this.initField(setting, subSetting));
                    }
                }
                form.append(tabContent);
                tabId += 1;
            }
        }
        document.body.append(form);

        let random_checkbox = document.getElementById("input-main-random");
        random_checkbox.addEventListener("change", () => {
            let rng_seed_input = document.getElementById("input-main-rng_seed");
            let field = rng_seed_input.parentElement;
            field.style.display= (random_checkbox.checked) ? "none" : "";
        });
    };

    Form.prototype.setTab = function(id){
        let tabs = document.getElementsByClassName("tab");
        for(let tab of tabs){
            let tabClass = (tab.getAttribute("tab-id") === id) ? "tab active" : "tab";
            tab.setAttribute("class", tabClass);
        }

        let contents = document.getElementsByClassName("tab-content");
        for(let content of contents){
            let contentClass = (content.getAttribute("tab-id") === id) ? "tab-content active" : "tab-content";
            content.setAttribute("class", contentClass);
        }
    };

    Form.prototype.initField = function(setting, subSetting){
        let settingValue = SETTINGS[setting][subSetting];
        let settingType = typeof settingValue;
        let inputType = (settingType === "boolean") ? "checkbox" : "tel";
        let inputId = "input-"+setting+"-"+subSetting;

        let field = dom("div", {"class": "field"});
        field.append(
            dom("label", {"textContent": subSetting, "for": inputId}),
            dom("input", {"type": inputType, "id": inputId, "value": settingValue}, {
                "change": (element) => {
                    if(inputType === "tel") element.value = absInt(element.value);
                    SETTINGS[setting][subSetting] = (inputType === "checkbox") ? element.checked : parseInt(element.value);
                }
            })
        );
        return field;
    };

    Form.prototype.get = function(){
        let form = document.getElementById(this.id);
        return form;
    };

    return new Form();
})();