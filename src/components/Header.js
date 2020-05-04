import React from "react";
import "./styles/Header.css";
import Logo from "../images/icon.png";

const Header = (props) => {
  return (
    <header className="header">
      <figure className="header-logo">
        <img className="header-logo--image" src={Logo} alt="Logo" />
        <h1 className="header-logo--title">CoronaData</h1>
      </figure>
      <menu className="header-menu">
        <li className="header-menu--option">Texto</li>
        <li className="header-menu--option">Texto</li>
        <li className="header-menu--option">Texto</li>
        <li className="header-menu--option">Texto</li>
      </menu>
    </header>
  );
};

export default Header;
