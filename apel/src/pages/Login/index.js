import React from "react";
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
import { Link } from "react-router-dom";
import * as qs from "query-string";
import "semantic-ui-css/semantic.min.css";
import "./styles.css";

const CheckSign = () => {
  // if (this.props.location.query.__firebase_request_key == "true") {
  //   return <Message>Sucesso! Agora faça login com a conta criada</Message>;
  // }
  const parsed = qs.parse(window.location.search);

  if (parsed.s == "true") {
    return <Message>Sucesso! Agora faça login com a conta criada</Message>;
  }
};

const submitHandler = (e) => {
  console.log(e); // terminar
};

const Login = () => (
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

    <div>{CheckSign()}</div>

    <Grid textAlign="center" style={{ height: "70vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          Entre em sua conta
        </Header>
        <Form size="large" onSubmit={submitHandler()}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Endereço de e-mail"
              name="email"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Senha"
              type="password"
              name="senha"
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

export default Login;
