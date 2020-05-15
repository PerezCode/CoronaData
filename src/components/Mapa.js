import React from "react";
import "./styles/Mapa.css";
import Modal from "./Modal";
import useGetDataOfAllCountries from "../hooks/useGetDataOfAllCountries";

class Mapa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesData: [],
      chartOptions: {
        region: "world", // Region a enfocar
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
          trigger: "focus",
        },
      },
      modalIsOpen: {
        data: {
          mapData: null,
        },
        state: false
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

    // If there is data in memory we use it.
    if(localStorage.getItem("dataOfAllCountries")){
      console.log("Se está usando la data local");
      const savedData = JSON.parse(localStorage.getItem("dataOfAllCountries"))
      this.setState({countriesData: savedData});
      const drawRegionsMap = () => {
        // Create the data table.
        let dataMap = window.google.visualization.arrayToDataTable([
          ["code", "name"],
          ["US", "Estados Unidos"],
        ]);

        // Instantiate and draw our chart.
        let chart = new window.google.visualization.GeoChart(
          document.getElementById("regions_div")
        );

        // Set chart options
        let options = this.state.chartOptions;

        // Here we set the useful information for main map.
        const countriesData = this.state.countriesData;
        for(let i = 0; i < countriesData.length; i++){
          const countryCode = countriesData[i].code;
          const countryName = countriesData[i].spanishName;
          dataMap.addRow([countryCode, countryName]);
        }
        chart.draw(dataMap, options);

        //Click event
        window.google.visualization.events.addListener(chart, "regionClick", ({ region }) => {
          // region is the country code
          const clickedCountry = this.state.countriesData.filter((country) => (country.code === region));
          this.handleOpenModal(dataMap, clickedCountry[0]);
        })
      }
      // Set a callback to run when the Google Visualization API is loaded.
      window.google.charts.setOnLoadCallback(drawRegionsMap);
    } else {
      console.log("Se pidió data a la api");
      useGetDataOfAllCountries()
      .then((allDataOfCountries) => {
        this.setState({countriesData: allDataOfCountries}, () => {
          localStorage.setItem("dataOfAllCountries", JSON.stringify(allDataOfCountries));
          const drawRegionsMap = () => {
            // Create the data table.
            let dataMap = window.google.visualization.arrayToDataTable([
              ["Code", "nombre"],
              ["US", "Estados Unidos"],
            ]);

            // Instantiate and draw our chart, passing in some options.
            let chart = new window.google.visualization.GeoChart(
              document.getElementById("regions_div")
            );

            // Set chart options
            let options = this.state.chartOptions;

            const countriesData = this.state.countriesData;
            for(let i = 0; i < countriesData.length; i++){
              const countryCode = countriesData[i].code;
              const countryName = countriesData[i].spanishName;
              dataMap.addRow([countryCode, countryName]);
            }
            chart.draw(dataMap, options);

            //Click event
            window.google.visualization.events.addListener(chart, "regionClick", ({ region }) => {
              // region is the country code
              const clickedCountry = this.state.countriesData.filter((country) => (country.code === region));
              this.handleOpenModal(dataMap, clickedCountry[0]);
            })
          }
          // Set a callback to run when the Google Visualization API is loaded.
          window.google.charts.setOnLoadCallback(drawRegionsMap);
        })
      })
    }
  };

  handleOpenModal = (mapData, countryData) => {
    this.setState({ modalIsOpen: {
      data: {
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
          <h3 className="mapContainer__subtitle">Clickea sobre cualquier país para conocer mas información</h3>
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
