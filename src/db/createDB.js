var json = require('../fixtures/db.json')
var fs = require('fs')

let codesAndNames = []

async function getData() {
    return json.map(countries => codesAndNames.push({ code: countries.code, spanishName: countries.spanishName }))
}


getData().then(
    fs.writeFile('./codesAndNamesDB.json', JSON.stringify(codesAndNames), 'utf8', () => {
        console.log('Escritura del archivo finalizada');
    })
)


