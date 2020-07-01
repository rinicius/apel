import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Map from "../pages/map";
import Profile from "../pages/profile";
import App from "../App";
import Main from "../pages/main";
import { PrivateRoute } from "./privateroute";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UploadImage from "../pages/upload";
import Profilealh from "../pages/profilealh";
import Index from "../pages/index";
import InsertProduct from "../pages/product";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/home" component={Main} />
      <Route path="/map" component={Map} />
      <PrivateRoute path="/profile" component={Profile} />
      <Route path="/profilealh" component={Profilealh} />
      <Route path="/upload" component={UploadImage} />
      <Route path="/login" component={Login} />
      <Route path="/index" component={Index} />
      <Route path="/signup" component={Signup} />
      <PrivateRoute path="/product" component={InsertProduct} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
