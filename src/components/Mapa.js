import React from "react";
import "./styles/Mapa.css";
import Modal from "./Modal";
import getDataOfAllCountries from "../fixtures/getDataOfAllCountries";
import chartOptions from "../fixtures/chartOptions.json"
import drawMapRegions from "../fixtures/drawMapRegions";
import fetchAPI from "../fixtures/fetchAPI";

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
    fetchAPI()
    .then(data => {
      const codigos = [];
      for (let index = 0; index < data.getCountrys.length; index++) {
        codigos.push(data.getCountrys[index].code.toUpperCase());
      }
      console.log("Codigos que trae la API de Jonattan: " + codigos);
      let cantidadDeMatchs = 0;

      for (let i = 0; i < this.state.countriesData.length; i++) {
        console.log("Variable i: ")
        console.log(i)
        for (let j = 0; j < codigos.length; j++) {
          console.log("Variable j: ")
          console.log(j)
          if(this.state.countriesData[i] === codigos[j]){
            cantidadDeMatchs += 1;
            // break;
          }
          console.log("holi");
        }
      }
      console.log("Matchs " + cantidadDeMatchs);
    })
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
