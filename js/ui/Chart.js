"use strict";

function Chart(type, datasets){
    this.chart = {
        type: type,
        data:{
            labels: [],
            datasets : []
        }
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

/*
Chart.prototype.initDataset = function(label, color){
    this.chart.data.datasets.push({
        label: label,
        fill: false,
        borderColor: color,
        data: []
    });
};
*/

Chart.prototype.updateLabels = function(label){
    this.chart.data.labels.push(label);
};

Chart.prototype.updateDataset = function(datas){
    for(let data in datas){
        this.chart.data.datasets[data].data.push(datas[data]);
    }
};

Chart.prototype.render = function(){
    let json = JSON.stringify(this.chart);
    let quickchart = window.open("https://quickchart.io/chart?c="+encodeURI(json), "_blank");
    quickchart.focus();
};

Chart.prototype.reset = function(){
    this.chart.data.labels = [];
    this.chart.data.datasets = [];
};