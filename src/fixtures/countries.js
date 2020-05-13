

//datos de los países de: https://restcountries.eu/
/* let countries = [];

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
} */

const getDataOfAllCountries = async () => {
    const codeString = "DZ,EG,EH,LY,MA,SD,SS,TN,BF,BJ,CI,CV,GH,GM,GN,GW,LR,ML,MR,NE,NG,SH,SL,SN,TG,AO,CD,CF,CG,CM,GA,GQ,ST,TD,BI,DJ,ER,ET,KE,KM,MG,MU,MW,MZ,RE,RW,SC,SO,TZ,UG,YT,ZM,ZW,BW,LS,NA,SZ,ZA,GG,JE,AX,DK,EE,FI,FO,GB,IE,IM,IS,LT,LV,NO,SE,SJ,AT,BE,CH,DE,FR,LI,LU,MC,NL,BG,BY,CZ,HU,MD,PL,RO,RU,SK,UA,AD,AL,BA,ES,GI,GR,HR,IT,ME,MK,MT,RS,PT,SI,SM,VA,BM,CA,GL,PM,US,AG,AI,AW,BB,BL,BS,CU,DM,DO,GD,GP,HT,JM,KN,KY,LC,MF,MQ,MS,PR,TC,TT,VC,VG,VI,BZ,CR,GT,HN,MX,NI,PA,SV,AR,BO,BR,CL,CO,EC,FK,GF,GY,PE,PY,SR,UY,VE,TM,TJ,KG,KZ,UZ,CN,HK,JP,KP,KR,MN,MO,TW,AF,BD,BT,IN,IR,LK,MV,NP,PK,BN,ID,KH,LA,MM,MY,PH,SG,TH,TL,VN,AE,AM,AZ,BH,CY,GE,IL,IQ,JO,KW,LB,OM,PS,QA,SA,SY,TR,YE,AU,NF,NZ,FJ,NC,PG,SB,VU,FM,GU,KI,MH,MP,NR,PW,AS,CK,NU,PF,PN,TK,TO,TV,WF,WS,XK"
    let codesArray = codeString.split(",");

    let countriesInObjects = [];
    for(let i = 0; i < codesArray.length; i++){
        const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${codesArray[i]}`);
        const countryData = await response.json();
        if(countryData){
            const object = {
                code: countryData.alpha2Code,
                name: countryData.name,
                capital: countryData.capital,
                spanishName: countryData.translations.es,
                population: countryData.population,
                beds: Math.round(Math.random() * 10000)
            }
            countriesInObjects.push(object);
        }
    }
    return countriesInObjects;
}

const getCountryData = async (isoCode) => {
    const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${isoCode}`);
    const dataCountry = await response.json();
    const respuesta = {
        code: dataCountry.alpha2Code,
        name: dataCountry.name,
        capital: dataCountry.capital,
        spanishName: dataCountry.translations.es,
        population: dataCountry.population,
        beds: Math.round(Math.random() * 10000)
    }
    return respuesta;
}

export default {
    getDataOfAllCountries: getDataOfAllCountries,
    getCountryData: getCountryData
};