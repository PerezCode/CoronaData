import React from "react";
import "./styles/ColumnChart.css";

const ColumnChartContainer = (props) => {
  window.google.charts.load("current", { packages: ["corechart"] });
  const drawChart = () => {
    var data = window.google.visualization.arrayToDataTable([
      ["Tipo de cama", "Cantidad", { role: "style" }, { role: "annotation" } ],
      ["Cama Pequeña", 2, "#b87333", "H"],
      ["Cama Mediana", 3, "silver", "o"],
      ["Cama Grande", 4, "gold", "L"],
      ["Cama Enorme", 5, "color: #e5e4e2", "A"]
    ]);

    var view = new window.google.visualization.DataView(data);
    view.setColumns([0, 1, {calc: "stringify", sourceColumn: 1, type: "string", role: "annotation" }, 2, 3]);

    var options = {
      title: "Cantidad de camas disponibles según su tipo. (Use el cursor para ver detalles)",
      width: "100%",
      height: "100%",
      bar: {groupWidth: "70%"},
      legend: { position: "none" },
    };
    var chart = new window.google.visualization.ColumnChart(document.getElementById("countryFirstChart__chart"));
    chart.draw(view, options);
  }
  window.google.charts.setOnLoadCallback(drawChart);
  return <ColumnChart />;
};

const ColumnChart = (props) => {
  return (
    <div className="countryFirstChart__chart" id="countryFirstChart__chart">
    </div>
  )
};

export default ColumnChartContainer;
