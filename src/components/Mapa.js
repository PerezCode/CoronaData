import React from "react";
import "./styles/Mapa.css";
import Modal from "./Modal";
import getDataOfAllCountries from "../fixtures/getDataOfAllCountries";
import chartOptions from "../fixtures/chartOptions.json"
import drawMapRegions from "../fixtures/drawMapRegions";

class Mapa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesData: [],
      chartOptions,
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
      // console.log("Se está usando la data local");
      const savedData = JSON.parse(localStorage.getItem("dataOfAllCountries"))
      this.setState({countriesData: savedData}, () => {
        drawMapRegions(this.state.chartOptions, this.state.countriesData, this.handleOpenModal);
      });
    } else {
      // console.log("Se pidió data a la api");
      getDataOfAllCountries()
      .then((allDataOfCountries) => {
        this.setState({countriesData: allDataOfCountries}, () => {
          localStorage.setItem("dataOfAllCountries", JSON.stringify(allDataOfCountries));
          drawMapRegions(this.state.chartOptions, this.state.countriesData, this.handleOpenModal);
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
