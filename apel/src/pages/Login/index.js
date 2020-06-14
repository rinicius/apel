import React, { Component } from "react";
import api from "../../services/api";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { Navbar, NavItem, DropdownMenu, Logo } from "../../components/header";
import { BsChevronDown } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsTagFill } from "react-icons/bs";
import { Link, Redirect } from "react-router-dom";
import * as qs from "query-string";
import "semantic-ui-css/semantic.min.css";
import "./styles.css";

class Login extends Component {
  state = {
    email: "",
    senha: "",
    tipo: "",
    isRedirect: false,
  };

  isRedirect = () => {
    this.setState({ isRedirect: true });
  };

  goingToRedirect = () => {
    if (this.state.isRedirect)
      return <Redirect to="/home?islog=true"> </Redirect>;
  };

  CheckSign = () => {
    const parsed = qs.parse(window.location.search);

    if (parsed.s == "true") {
      return <Message>Sucesso! Agora faça login com a conta criada</Message>;
    }
  };

  submitHandler = () => {
    const usuario = this.state;
    console.log(this.state);

    api
      .post(`/login`, usuario)
      .then((res) => {
        console.log(res);
        window.localStorage.setItem("currentUser", res.data.token);
        this.isRedirect();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div>
          <Logo />
          <Navbar>
            <NavItem icon={<BsTagFill />}></NavItem>
            <NavItem icon={<BsGeoAlt />} link="/map"></NavItem>
            <NavItem icon={<BsChevronDown />}>
              <DropdownMenu />
            </NavItem>
          </Navbar>
        </div>

        <div>{this.CheckSign}</div>
        <div>{this.goingToRedirect()}</div>

        <Grid
          textAlign="center"
          style={{ height: "70vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="black" textAlign="center">
              Entre em sua conta
            </Header>
            <Form size="large" onSubmit={this.submitHandler}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Endereço de e-mail"
                  name="email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Senha"
                  type="password"
                  name="senha"
                  onChange={(e) => this.setState({ senha: e.target.value })}
                />

                <Button color="black" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              Novo na plataforma? <Link to="/signup">Cadastre-se</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default Login;
