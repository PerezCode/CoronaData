const fetch = require("node-fetch");

//datos de los países de: https://restcountries.eu/
let countries = [];

async function getCountries() {

    await fetch("https://restcountries.eu/rest/v2/all")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (const country of data) {
                countries.push({
                    code: country.alpha2Code,
                    name: country.name,
                    capital: country.capital,
                    spanishName: country.translations.es,
                    population: Math.round(Math.random() * 1000000),
                    beds: Math.round(Math.random() * 10000)
                });
            }
            return countries
        })
}

async function getCountry(isoCode) {

    await fetch(`https://restcountries.eu/rest/v2/alpha/${isoCode}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let respuesta = {
                code: data.alpha2Code,
                name: data.name,
                capital: data.capital,
                spanishName: data.translations.es,
                population: Math.round(Math.random() * 1000000),
                beds: Math.round(Math.random() * 10000)
            }
            return respuesta
        })
}

export default {
    getCountries,
    getCountry
}