import React, { Fragment } from "react";
import Header from "../components/Header";
import Mapa from "../components/Mapa";

const PaginaPrincipal = (props) => {
  return (
    <Fragment>
      <Header />
      <Mapa />
    </Fragment>
  );
};

export default PaginaPrincipal;
