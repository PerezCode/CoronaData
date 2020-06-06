import React from 'react'
import './styles/SearchBar.css'
import { MdSearch } from "react-icons/md";

const SearchBar = (props) => {
    return (
        <section className="main-input">
            <div className="main-input-container">
                <div className="searchIcon">
                    <MdSearch size={24}/>
                </div>
            <input type="text" />
            </div>
        </section>
    )
}

export default SearchBar