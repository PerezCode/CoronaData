import React, { useState, useEffect } from 'react';
import './styles/Measures.css'

const Measures = props => {
    let [ countryMeasures, setCountryMeasures ] = useState([])

    useEffect(() => {
        setCountryMeasures(props.country.restrictions)
    }, [props])

    return(
        <div>
            <h3 className="measures__title">Comunicados oficiales del país:</h3>
            {
                countryMeasures.length === 0 ?
                    <p className="measures__measures--noData">No tenemos datos oficiales disponibles :(</p> 
                :
                <div className="measures__measures">
                    <ul>
                        {countryMeasures.map((item, index) => <li key={index} className="measures__measures--text">{`${item.dateStart}: ${item.description}`}</li>)}
                    </ul>
                </div>
            }

        </div>
    )
}

export default Measures;