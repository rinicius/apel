import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Map from "../pages/map";
import Profile from "../pages/profile";
import App from "../App";
import Main from "../pages/main";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/home" component={Main} />
      <Route path="/map" component={Map} />
      <Route path="/profile" component={Profile} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
