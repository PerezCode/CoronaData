import React from "react";
import "./styles/Mapa.css";
import Modal from "./Modal";

import getCountry from '../fixtures/countries'



class Mapa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // code ISO 3166-1 alpha-2 ejemplo: CO, MX
      countriesCode: [],
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
    let codeString = "DZ,EG,EH,LY,MA,SD,SS,TN,BF,BJ,CI,CV,GH,GM,GN,GW,LR,ML,MR,NE,NG,SH,SL,SN,TG,AO,CD,ZR,CF,CG,CM,GA,GQ,ST,TD,BI,DJ,ER,ET,KE,KM,MG,MU,MW,MZ,RE,RW,SC,SO,TZ,UG,YT,ZM,ZW,BW,LS,NA,SZ,ZA,GG,JE,AX,DK,EE,FI,FO,GB,IE,IM,IS,LT,LV,NO,SE,SJ,AT,BE,CH,DE,DD,FR,FX,LI,LU,MC,NL,BG,BY,CZ,HU,MD,PL,RO,RU,SU,SK,UA,AD,AL,BA,ES,GI,GR,HR,IT,ME,MK,MT,RS,PT,SI,SM,VA,YU,BM,CA,GL,PM,US,AG,AI,AN,AW,BB,BL,BS,CU,DM,DO,GD,GP,HT,JM,KN,KY,LC,MF,MQ,MS,PR,TC,TT,VC,VG,VI,BZ,CR,GT,HN,MX,NI,PA,SV,AR,BO,BR,CL,CO,EC,FK,GF,GY,PE,PY,SR,UY,VE,TM,TJ,KG,KZ,UZ,CN,HK,JP,KP,KR,MN,MO,TW,AF,BD,BT,IN,IR,LK,MV,NP,PK,BN,ID,KH,LA,MM,BU,MY,PH,SG,TH,TL,TP,VN,AE,AM,AZ,BH,CY,GE,IL,IQ,JO,KW,LB,OM,PS,QA,SA,NT,SY,TR,YE,YD,AU,NF,NZ,FJ,NC,PG,SB,VU,FM,GU,KI,MH,MP,NR,PW,AS,CK,NU,PF,PN,TK,TO,TV,WF,WS"
    let codesArray = codeString.split(",");
    this.setState({countriesCode: codesArray});

    // Load the Visualization API and the corechart package.
    window.google.charts.load("current", {
      packages: ["geochart"],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY",
    });
    
    const drawRegionsMap = () => {
      // Create the data table.
      let data = window.google.visualization.arrayToDataTable([
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

      const posibleValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

      // Dynamic assignment of values ​​to countries
      const countriesCode = this.state.countriesCode;
      for (let i = 0; i < countriesCode.length; i++) {
        const country = countriesCode[i];
        let totalBeds =
          posibleValues[Math.round(Math.random() * (9 - 0) + 0)];
        let population = 2000;
        // Add data
        data.addRow([country, totalBeds, population]);
      }
      // Draw map
      chart.draw(data, options);

      //Click event
      window.google.visualization.events.addListener(chart, "regionClick", (r) =>{
        // console.log(r)
        getCountry(r.region).then(e => {
          let countryData = {
            name: e.spanishName,
            capital: e.capital,
            population: e.population,
            beds: e.beds
          }
          this.handleOpenModal(r.region, data, countryData);
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
