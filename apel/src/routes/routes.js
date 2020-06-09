import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Map from "../pages/map";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Map} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
