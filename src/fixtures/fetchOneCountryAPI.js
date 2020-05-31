const { request } = require("graphql-request");

const main = async (codeCountry) => {
    const endpoint = "https://app-backend-graphql.herokuapp.com/";
    //Este es el Query de un pais
    //console.log(`Este es el codigo que se recibió: ${codeCountry}`);
    //console.log(typeof(codeCountry))

    const query = /* GraphQL */ `
    query getCountry($code: String!) {
      getCountry(code: $code) {
        code
        lat
        lng
        bedsTotal
        bedsAverage
        populationAverage
        estimatedBedsTotal
        estimatedBedsAverage
      }
    }
  `

    const variables = {
        code: `${codeCountry.toLowerCase()}`,
    };
    const data = await request(endpoint, query, variables);
    return data
    // console.log(JSON.stringify(data, undefined, 2));
}
// main().catch((error) => console.error(error)); */

export default main;