import React from "react";
import "./styles/Header.css";
import Logo from "../images/LogoCoronaData.png";

const Header = (props) => {
  return (
    <header className="header">
      <figure className="header-logo">
        <img className="header-logo__image" src={Logo} alt="Logo" />
        <h1 className="header-logo__title">CoronaData</h1>
      </figure>
      <menu className="header-menu">
        <li className="header-menu__option">Texto</li>
        <li className="header-menu__option">Texto</li>
        <li className="header-menu__option">Texto</li>
        <li className="header-menu__option">Texto</li>
      </menu>
    </header>
  );
};

export default Header;
