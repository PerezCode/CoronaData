const { request } = require("graphql-request");

const main = async () => {
  const endpoint = "https://app-backend-graphql.herokuapp.com/";
  //Este es el Query de un pais
  const query = `
  {
    getCountrys{
      _id
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
