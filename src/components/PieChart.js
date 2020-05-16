import React from 'react'
import './styles/ColumnChart.css'

const PieChartContainer = (props) => {
    // Load the visualization API and the piechart package
    window.google.charts.load('current', {'packages':['corechart']})

    const drawChart = () => {

        // Create the data table.
        var data = new window.google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Psiquiatricas', 300],
          ['Ortopédicas', 100],
          ['Geriátricas', 200],
          ['Otros', 400]
        ]);
    
        // Set chart options
        var options = {//'title':'Porcentaje de camas disponibles por tipo',
                        'width':'100%',
                        'height':'100%',
                        'chartArea': {
                            'width': '80%',
                            'height': '80%'
                        }};
    
        // Instantiate and draw our chart, passing in some options.
        var chart = new window.google.visualization.PieChart(document.getElementById('countrySecondChart__chart'));
        chart.draw(data, options);
    }

    window.google.charts.setOnLoadCallback(drawChart)
    return <PieChart />
}

const PieChart = (props) => {
    return(
        <div className='countrySecondChart__chart' id='countrySecondChart__chart'>
            
        </div>
    )
}

export default PieChartContainer