const { request } = require("graphql-request");

const main = async () => {
  const endpoint = "https://app-backend-graphql.herokuapp.com/";

  const query = /* GraphQL */ `{
    getCountrys{
      code
      bedsTotal
      bedsAverage
      populationAverage
      estimatedBedsTotal
      estimatedBedsAverage
      typebed{
        type
        total
        percentage
        population
        estimatedForPopulation
        source
        sourceUrl
        year
      }
      restrictions{
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
  }`

  const data = await request(endpoint, query);
  return data
  // console.log(JSON.stringify(data, undefined, 2));
}
// main().catch((error) => console.error(error)); */

export default main;
