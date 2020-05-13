import React from "react";
import "./styles/Mapa.css";
import Modal from "./Modal";
import getCountryData from '../fixtures/countries';

class Mapa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesData: [],
      modalIsOpen: {
        data: {
          mapData: null,
          clickedCountryCode: "",
        },
        state: false,
      }
    };
  }

  componentDidMount = () => {
    // Load the Visualization API and the corechart package.
    window.google.charts.load("current", {
      packages: ["geochart"],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY",
    });

    const drawRegionsMap = () => {
      // Create the data table.
      let dataMap = window.google.visualization.arrayToDataTable([
        ["País", "Total de camillas", "Poblacion"],
        ["US", 100, 10000],
      ]);

      // Instantiate and draw our chart, passing in some options.
      let chart = new window.google.visualization.GeoChart(
        document.getElementById("regions_div")
      );

      // Set chart options
      let options = {
        region: "world", // Region a enfocar
        colorAxis: { colors: ["#54828D", "#27496E"] }, // Escala de colores
        datalessRegionColor: "gray", // Color de paises sin data
        defaultColor: "#f5f5f5", // Color de paises con valor en null
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
          trigger: "focus",
        },
      };

      getCountryData.getDataOfAllCountries()
      .then((response) => {
        this.setState({countriesData: response}, () => {
          const countriesData = this.state.countriesData;
          for(let i = 0; i < countriesData.length; i++){
            const countryName = countriesData[i].code;
            const totalBeds = countriesData[i].beds;
            const population = countriesData[i].population;
            dataMap.addRow([countryName, totalBeds, population]);
          }
        });
      })
      .then(()=> {
        // Draw map
        chart.draw(dataMap, options);
      })
      .catch((err) => {
        console.log(err)
      })

      //Click event
      window.google.visualization.events.addListener(chart, "regionClick", ({ region }) => {
        // region is the country code
        const countryCode = region;
        getCountryData.getCountryData(countryCode)
          .then( countryData => {
          const usefulCountryData = {
            name: countryData.spanishName,
            capital: countryData.capital,
            population: countryData.population,
            beds: countryData.beds
          }
          this.handleOpenModal(countryCode, dataMap, usefulCountryData);
        })
      })
    }

    // Set a callback to run when the Google Visualization API is loaded.
    window.google.charts.setOnLoadCallback(drawRegionsMap);
  };

  handleOpenModal = (code, mapData, countryData) => {
    this.setState({ modalIsOpen: {
      data: {
        clickedCountryCode: code,
        countryData,
        mapData,
      },
      state: true
    }})
  }

  handleCloseModal = () => {
    this.setState({ modalIsOpen: {
      data: {},
      state: false
    }})
  }

  render() {
    return (
      <React.Fragment>
        <div id="map-container" className="mapContainer">
          <h2 className="mapContainer__title">
            Consulta información sobre el COVID-19 en tu país
          </h2>
          <div className="mapContainer__map" id="regions_div"></div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen.state}
          data={this.state.modalIsOpen.data}
          onCloseModal={this.handleCloseModal}
        />
      </React.Fragment>
    );
  }
}

export default Mapa;
