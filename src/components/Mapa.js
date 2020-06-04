import React from "react";
import "./styles/Mapa.css";
import Modal from "./Modal";
import chartOptions from "../fixtures/chartOptions.json"
import drawMapRegions from "../fixtures/drawMapRegions";
import SearchBar from './SearchBar';
import Loader from "./Loader";
import fetchAPI from "../fixtures/fetchAllCountriesAPI";
import dataBase from "../db/codesAndNamesDB.json";

class Mapa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToDrawMap: [],
      countriesData: [],
      chartOptions,
      modalIsOpen: {
        data: {
          mapData: null,
        },
        state: false
      },
      loading: true
    };
  }

  componentDidMount = () => {

    fetchAPI()
      .then((response) => {
        this.setState({dataToDrawMap: dataBase, loading: false, countriesData: response}, () => {
          drawMapRegions(this.state.chartOptions, this.state.dataToDrawMap, this.handleOpenModal);
        })
      });

    // Load the Visualization API and the corechart package.
    window.google.charts.load("current", {
      packages: ["geochart"],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY",
    });
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
        {
          this.state.loading
          ? <Loader />
          :
          <div id="map-container" className="mapContainer">
            <h3 className="mapContainer__subtitle">
              Haz click sobre cualquier país para conocer mas información
            </h3>
            <div className="searchBar"><SearchBar /></div>
            <div className="mapContainer__map" id="regions_div"></div>
          </div>
        }
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
