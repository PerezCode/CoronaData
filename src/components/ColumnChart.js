import React, { useState, useEffect } from "react";
import "./styles/ColumnChart.css";

const ColumnChartContainer = (props) => {

  const [ beds, setBeds ] = useState([])

  let datos = [
    ["Tipo de cama", "Cantidad", { role: "style" }, { role: "annotation" }],
  ]


  useEffect(() => {
    
    setBeds(props.country.typeBed)

    if (beds === undefined || null) {
      console.log('objeto vacio')
    }else{

      if (beds === undefined || null) {

      }else{
        beds.map(d => {
          datos.push([d.type, parseInt(d.total), "#b87333", ""])
        })

        draw(datos)
      }

    }

  })

  function draw(datos) {
    window.google.charts.load("current", { packages: ["corechart"] });
    const drawChart = () => {
      var data = window.google.visualization.arrayToDataTable(datos);

      var view = new window.google.visualization.DataView(data);
      view.setColumns([0, 1, { calc: "stringify", sourceColumn: 1, type: "string", role: "annotation" }, 2, 3]);

      var options = {
        title: "Camas disponibles por cada mil habitantes",
        width: "100%",
        height: "100%",
        bar: { groupWidth: "70%" },
        legend: { position: "none" },
      };
      var chart = new window.google.visualization.ColumnChart(document.getElementById("countryFirstChart__chart"));
      chart.draw(view, options);
    }
    window.google.charts.setOnLoadCallback(drawChart);
  }

  return <ColumnChart />;
};

const ColumnChart = (props) => {
  return (
    <div className="countryFirstChart__chart" id="countryFirstChart__chart">
    </div>
  )
};

export default ColumnChartContainer;
