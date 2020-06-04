import React, { useState, useEffect } from 'react'
import './styles/PieChart.css'

const PieChartContainer = (props) => {
	const [ beds, setBeds ] = useState([])

  // ["Psiquiatricas", 300],
	// ["Ortopédicas", 100],
	// ["Geriátricas", 200],
	// ["Otros", 400],

	let datos = [];

	useEffect(() => {
		setBeds(props.country.typebed);
		if (beds === undefined || null) {
		console.log("objeto vacio, pieChart");
		} else {
		if (beds === undefined || null) {
		} else {
			beds.map((d) => (datos.push([d.type, parseFloat(d.total)])));
			draw(datos);
			}
		}
	}, [props.country.typebed, beds, datos]);

	function draw(datos) {
		// Load the visualization API and the piechart package
		window.google.charts.load("current", { packages: ["corechart"],});

		const drawChart = () => {
			// Create the data table.
			var data = new window.google.visualization.DataTable();
			data.addColumn("string", "Topping");
			data.addColumn("number", "Slices");
			data.addRows(datos);

			// Set chart options
			var options = {
					//'title':'Porcentaje de camas disponibles por tipo',
					width: "100%",
					height: "100%",
					chartArea: {
						width: "80%",
						height: "80%",
					},
			};

			// Instantiate and draw our chart, passing in some options.
			var chart = new window.google.visualization.PieChart( document.getElementById("countrySecondChart__chart"));
			chart.draw(data, options);
		};

		window.google.charts.setOnLoadCallback(drawChart);
	}
	return <PieChart />
}

const PieChart = (props) => {
	return(
		<div className='countrySecondChart__chart' id='countrySecondChart__chart'>
		</div>
	)
}

export default PieChartContainer