import React from "react";
import "./styles/Mapa.css";
import Modal from "./Modal";
import getDataOfAllCountries from "../fixtures/getDataOfAllCountries";
import chartOptions from "../fixtures/chartOptions.json"
import drawMapRegions from "../fixtures/drawMapRegions";
import fetchAPI from "../fixtures/fetchAPI";
import SearchBar from './SearchBar'
import Loader from "./Loader";

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
      },
      loading: true
    };
  }

  componentDidMount = () => {

    const codigosAPI = []
    let noPaises = 0

    fetchAPI()
    .then(data => {

      for (let index = 0; index < data.getCountrys.length; index++) {
        codigosAPI.push(data.getCountrys[index].code.toUpperCase())
        noPaises++
      }
      console.log("Codigos que trae la API de Jonattan: " + codigosAPI)

      console.log(codigosAPI)
      console.log(`No de paises: ${noPaises}`)

      console.log('')
      console.log('Códigos que hay en la base de datos')
      console.log('')

      // Los datos de los paíces almacenados en la base de datos
      let codigosDB = this.state.countriesData

      // De los objetos con los datos de los países, sólo ocupamos los códigos de los países, así que los almacenamos en un nuevo arreglo
      let onlyCodesDB = codigosDB.map((codigoPais, index, Array) => {
        return codigoPais.code
      })
      console.log(onlyCodesDB)

      // Aquí vamos a almacenar los códigos de los países que faltan de la API de Jonhatan
      let codigosFaltantes = []

      for (const pais of onlyCodesDB) {
        if (!codigosAPI.includes(pais)) {
          codigosFaltantes.push(pais)
        }
      }

      console.log('')
      console.log('Países que faltan:')
      console.log('')

      console.log(codigosFaltantes)

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
      this.setState({countriesData: savedData, loading: false}, () => {
        drawMapRegions(this.state.chartOptions, this.state.countriesData, this.handleOpenModal);
      });
    } else {
      // console.log("Se pidió data a la api");
      getDataOfAllCountries()
      .then((allDataOfCountries) => {
        this.setState({countriesData: allDataOfCountries, loading: false}, () => {
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
