import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PaginaPrincipal from "../pages/PaginaPrincipal";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/PaginaPrincipal" component={PaginaPrincipal} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
