import React, { useState, useEffect } from "react";
import "./styles/ColumnChart.css";

const ColumnChartContainer = (props) => {
  //console.log(props.country);

  const [ beds, setBeds ] = useState([])

/*   let datos = [
    ["Tipo de cama", "Cantidad", { role: "style" }, { role: "annotation" }]
  ] */

  let nuevosDatos = []

  useEffect(() => {
    setBeds(props.country.typeBed)

    if (beds === undefined || null) {
      console.log('objeto vacio')
    }else{
/*       let stringDeTextos = JSON.stringify(beds)
      console.log('una cadena')
      console.log(stringDeTextos) */
      //console.log(props.country.typeBed)
      if (beds === undefined || null) {

      }else{
        beds.map(d => {
          nuevosDatos.push([d.type, parseInt(d.total), '#b87333', 'p'])
        })
      }

      console.log(nuevosDatos)

    }

  })

  let datos = [
    ["Tipo de cama", "Cantidad", { role: "style" }, { role: "annotation" }],
    ["Cama Pequeña", 2, "#b87333", "H"],
    ["Cama Mediana", 3, "silver", "o"],
    ["Cama Grande", 4, "gold", "L"],
    ["Cama Enorme", 5, "color: #e5e4e2", "A"]
  ]

  window.google.charts.load("current", { packages: ["corechart"] });
  const drawChart = () => {
    var data = window.google.visualization.arrayToDataTable(datos);

    var view = new window.google.visualization.DataView(data);
    view.setColumns([0, 1, {calc: "stringify", sourceColumn: 1, type: "string", role: "annotation" }, 2, 3]);

    var options = {
      title: "(Use el cursor para ver detalles)",
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
