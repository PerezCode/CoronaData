import React, { useState, useEffect } from 'react';

const Measures = props => {
    let [ countryMeasures, setCountryMeasures ] = useState([])

    useEffect(() => {
        setCountryMeasures(props.country.restrictions)
    }, [props])

    return(
        <div>
            <h2>Comunicados oficiales del país:</h2>
            <ul>
                {countryMeasures.map((item, index) => <li key={index}>{`${item.dateStart}: ${item.description}`}</li>)}
            </ul>
            
        </div>
    )
}

export default Measures;