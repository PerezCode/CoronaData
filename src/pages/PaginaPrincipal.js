import React, { Fragment, useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Mapa from "../components/Mapa";
import "./styles/PaginaPrincipal.css";

const PaginaPrincipal = (props) => {
  return (
    <Fragment>
      <Header />
      <Main>
      <div className="mainContainer" id="mainContainer">
        <h2 className="mainContainer__title">
          Consulta información sobre el COVID-19 en tu país
        </h2>
        <Mapa />
      </div>
      </Main>
    </Fragment>
  );
};

export default PaginaPrincipal;
