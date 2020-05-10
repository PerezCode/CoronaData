const fetch = require("node-fetch");
const fs = require('fs')

//datos de los países de: https://restcountries.eu/
let countries = [];

fetch("https://restcountries.eu/rest/v2/all")
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
        fs.writeFile('./db.json',
            JSON.stringify(countries), 'utf8', (err) => {
                console.log('El archivo ha sido creado');
            })
    });