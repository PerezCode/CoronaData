const { request } = require("graphql-request");

const main = async (codeCountry) => {
    const endpoint = "https://app-backend-graphql.herokuapp.com/";
    //Este es el Query de un pais
    console.log(`Este es el codigo que se recibió: ${codeCountry}`);
    console.log(typeof(codeCountry))

    const query = `
    {
    getCountry(code: "mx") {
        code
        lat
        lng
        bedsTotal
        bedsAverage
        populationAverage
        estimatedBedsTotal
        estimatedBedsAverage
        typebed {
            type
            total
            percentage
            population
            estimatedForPopulation
            source
            sourceUrl
            year
        }
        restrictions {
            dateStart
            dateEnd
            description
            keywords
            exceptions
            quantity
            implementingCities
            targetCountries
            targetRegions
            implementingStates
        }
        }
    }
`;
    const variables = {
        code: "co",
    };
    const data = await request(endpoint, query, variables);
    return data
    // console.log(JSON.stringify(data, undefined, 2));
}
// main().catch((error) => console.error(error));

export default main;