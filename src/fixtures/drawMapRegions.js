const drawMapRegions = (chartOptions, countriesData, handleOpenModal) => {
  const draw = () => {
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
    let options = chartOptions;

    // Here we set the useful information for main map.
    for(let i = 0; i < countriesData.length; i++){
      const countryCode = countriesData[i].code;
      const countryName = countriesData[i].spanishName;
      dataMap.addRow([countryCode, countryName]);
    }
    chart.draw(dataMap, options);
    //Click event
    window.google.visualization.events.addListener(chart, "regionClick", ({ region }) => {
      // region is the country code
      const clickedCountry = countriesData.filter((country) => (country.code === region));
      handleOpenModal(dataMap, clickedCountry[0]);
    })
  }
  // Set a callback to run when the Google Visualization API is loaded.
  window.google.charts.setOnLoadCallback(draw);
}

export default drawMapRegions;