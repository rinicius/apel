import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Map from "../pages/map";
import Profile from "../pages/profile";
import App from "../App";
import Main from "../pages/main";
import { PrivateRoute } from "./privateroute";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/home" component={Main} />
      <Route path="/map" component={Map} />
      <PrivateRoute path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
