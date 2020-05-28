import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/Modal.css";
import PieChart from "./PieChart"
import ColumnChart from "./ColumnChart";

import fetchOneCountryAPI from "../fixtures/fetchOneCountryAPI"

// Iconos importados de react-icon
import { MdOpenInNew } from "react-icons/md";

const Modal = (props) => {

  const [population, setPopulation] = useState(0)

  if(props.isOpen){
    // Load the Visualization API and the corechart package.
    window.google.charts.load("current", {
      packages: ["geochart"],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY",
    });

    const drawRegionsMap = () => {
      // Create the data table.
      const data = window.google.visualization.arrayToDataTable([
        ["code"],
        [props.data.countryData.code],
      ]);
      // Instantiate and draw our chart, passing in some options.
      const chart = new window.google.visualization.GeoChart(
        document.getElementById("map-modal")
      );

      // Set chart options
      const options = {
        region: props.data.countryData.code, // Region a enfocar
        colorAxis: { colors: ["#54828D", "#27496E"] }, // Escala de colores
        datalessRegionColor: "gray", // Color de paises sin data
        defaultColor: "#54828D", // Color de paises con valor en null
        backgroundColor: { fill: "#9EC7F3" },
        legend: {
          textStyle: {
            color: "blue",
            fontSize: 16,
            italic: false,
            bold: false,
          },
        },
        tooltip: {
          textStyle: {
            color: "black",
            fontSize: 17,
            bold: false,
            italic: false,
          },
          showColorCode: true,
          trigger: "none",
        },
      };

      // Draw map
      chart.draw(data, options);
    }
    // Set a callback to run when the Google Visualization API is loaded.
    window.google.charts.setOnLoadCallback(drawRegionsMap);

    fetchOneCountryAPI(props.data.countryData.code)
      .then(data => {
        let beds = data.getCountry.estimatedBedsTotal
      })

    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modalCard">
          <button className="modalCard__closeButton" onClick={props.onCloseModal}>X</button>
          <div className="modalCardData">
            <div className="countryData">
              <div className="countryData__map">
                <div id="map-modal"></div>
              </div>
              <div className="countryData__countryName">{props.data.countryData.spanishName}</div>
              <div className="countryData__countryCapital">{props.data.countryData.capital}</div>
              <div className="countryData__countryPopulation">
                No. De habitantes: {Intl.NumberFormat().format(props.data.countryData.population)}
              </div>
              <div className="countryData__countryAvailableBeds">
                Total de camas disponibles: {Intl.NumberFormat().format(props.data.countryData.beds)}
              </div>
            </div>
            <div className="countryFirstChart">
              <ColumnChart />
              <div className="countryFirstChart__description">
                <p>Cantidad de camas disponibles según su tipo.</p>
              </div>
            </div>
            <div className="countrySecondChart">
              <PieChart />
{/*               <div className="countrySecondChart__chart">
                <img src=*/}
              <div className="countrySecondChart__description">
                <p>Porcentaje de camas disponibles por tipo de cama</p>
              </div> 
            </div>
            <div className="linkToMeasures">
              <div className="linkToMeasures__text">
                <p>¿Qué medidas está tomando el país para contrarrestar los posibles efectos del virus? <MdOpenInNew /></p>
              </div>
            </div>
            <div className="dataSource">
              <p className="dataSource__info">Medidas de escala por cada 1,000 habitantes</p>
              <p className="dataSource__sourceName">Fuente: <span>Página de la fuente</span></p>
              <small ></small>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("mainContainer"));
  } else {
    return null;
  }
}

export default Modal;