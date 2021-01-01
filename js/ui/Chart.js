"use strict";

function Chart(type, datasets){
    this.chart = {
        type: type,
        data:{
            labels: [],
            datasets : []
        },
        options:{}
    };

    this.init(datasets);
}

Chart.prototype.init = function(datasets){
    for(let dataset of datasets){
        this.chart.data.datasets.push({
            label: dataset.label,
            fill: false,
            borderColor: dataset.color,
            data : []
        });
    }
};

Chart.prototype.update = function(label, datas){
    this.chart.data.labels.push(label);
    for(let data in datas){
        this.chart.data.datasets[data].data.push(datas[data]);
    }
};

Chart.prototype.render = function(callback){
    let json = {"chart": this.chart};
    fetch("https://quickchart.io/chart/create", {
        method: "post", headers: {"Content-Type": "application/json"},
        body: JSON.stringify(json)
    })
    .then((res) => res.json())
    .then((res) => callback(res));
};

Chart.prototype.reset = function(){
    this.chart.data.labels = [];
    for(let dataset of this.chart.data.datasets){
        dataset.data = [];
    }
};