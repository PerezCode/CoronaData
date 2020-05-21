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
    </header>
  );
};

export default Header;
