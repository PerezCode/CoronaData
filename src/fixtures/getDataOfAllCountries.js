const getDataOfAllCountries = async () => {
  const codeString = "DZ,EG,LY,MA,SD,TN,BF,BJ,CI,CV,GH,GM,GN,GW,LR,ML,MR,NE,NG,SL,SN,TG,AO,CD,CF,CG,CM,GA,GQ,ST,TD,BI,DJ,ER,ET,KE,KM,MG,MU,MW,MZ,RW,SC,SO,TZ,UG,ZM,ZW,BW,LS,SZ,ZA,DK,EE,FI,GB,IE,IS,LT,LV,NO,SE,AT,BE,CH,DE,FR,LI,LU,MC,NL,BG,BY,CZ,HU,MD,PL,RO,RU,SK,UA,AD,AL,BA,ES,GR,HR,IT,ME,MK,MT,RS,PT,SI,SM,BM,CA,GL,US,AG,BB,BS,CU,DM,DO,GD,HT,JM,KN,KY,LC,PR,TT,VC,VI,BZ,CR,GT,HN,MX,NI,PA,SV,AR,BO,BR,CL,CO,EC,GY,PE,PY,SR,UY,VE,TM,TJ,KG,KZ,UZ,CN,HK,JP,KP,KR,MN,MO,TW,AF,BD,BT,IN,IR,LK,MV,NP,PK,BN,ID,KH,LA,MM,MY,PH,SG,TH,TL,VN,AE,AM,AZ,BH,CY,GE,IL,IQ,JO,KW,LB,OM,PS,QA,SA,SY,TR,YE,AU,NZ,FJ,PG,SB,VU,FM,KI,MH,NR,PW,TO,TV,WS";
  let codesArray = codeString.split(",");

  let countriesInObjects = [];
  for (const code of codesArray) {
    const response = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${code}`
    );
    const countryData = await response.json();
    if (countryData) {
      const object = {
        code: countryData.alpha2Code,
        name: countryData.name,
        capital: countryData.capital,
        spanishName: countryData.translations.es,
        population: countryData.population,
        beds: Math.round(Math.random() * 10000),
      };
      countriesInObjects.push(object);
    }
  }
  return countriesInObjects;
};

export default getDataOfAllCountries;