import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PaginaPrincipal from "../pages/PaginaPrincipal";
import Loader from "./Loader";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/PaginaPrincipal" component={PaginaPrincipal} />
        <Route path="/Loader" component={Loader} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
