import swal from "sweetalert";

const drawMapRegions = (chartOptions, countriesData, countriesDataAPI, handleOpenModal) => {
  const draw = () => {
    // Create the data table.
    let mapData = window.google.visualization.arrayToDataTable([
      ["code", "name"],
      ["US", "Estados Unidos"],
    ]);

    // Instantiate and draw our chart.
    let chart = new window.google.visualization.GeoChart(
      document.getElementById("regions_div")
    );

    // Set chart options
    let options = chartOptions;

    // Here we set the useful information for main map.
    for(let i = 0; i < countriesData.length; i++){
      const countryCode = countriesData[i].code;
      const countryName = countriesData[i].spanishName;
      mapData.addRow([countryCode, countryName]);
    }
    chart.draw(mapData, options);
    //Click event
    window.google.visualization.events.addListener(chart, "regionClick", ({ region }) => {
      // region is the country code
      const countryData = countriesData.filter((country) => (country.code.toUpperCase() === region));
      const countryDataAPI = countriesDataAPI.filter((country) => (country.code.toUpperCase() === region));
      if (countryDataAPI[0] === undefined) {
        swal({
          title: "oouch!",
          text: "No tenemos datos registrados sobre este país :(",
          icon: "error",
          button: "Volver al mapa!",
        })
      }else{
        handleOpenModal(mapData, countryData[0], countryDataAPI[0]);
      }
      
    })
  }
  // Set a callback to run when the Google Visualization API is loaded.
  window.google.charts.setOnLoadCallback(draw);
}

export default drawMapRegions;