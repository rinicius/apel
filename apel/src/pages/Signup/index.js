import React, { Component } from "react";
import api from "../../services/api";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Radio,
} from "semantic-ui-react";
import { Navbar, NavItem, DropdownMenu, Logo } from "../../components/header";
import { BsChevronDown } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsTagFill } from "react-icons/bs";
import { Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./styles.css";

class Signup extends Component {
  state = {
    values: {
      nome: "",
      email: "",
      senha: "",
      idade: "",
      sexo: "",
      profissao: "",
      endereco: "",
      telefone: "",
    },
    value: "",
    redirect: false,
    selectedFile: null,
  };

  submitFile = () => {};

  handleChange = (e, { value }) => {
    this.setState({ value });
  };

  isUser = (value) => {
    if (value === "empresa") {
      return (
        <div>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Nome"
            name="nome"
            onChange={(e) => this.setState({ nome: e.target.value })}
          />
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            placeholder="Endereço de e-mail"
            name="email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <Form.Input
            fluid
            icon="text telephone"
            iconPosition="left"
            placeholder="Telefone"
            name="telefone"
            onChange={(e) => this.setState({ telefone: e.target.value })}
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
          <Form.Input
            fluid
            icon="location arrow"
            iconPosition="left"
            placeholder="Localização (sem acentos)"
            name="endereco"
            onChange={(e) => this.setState({ endereco: e.target.value })}
          ></Form.Input>
          <Form.Input
            fluid
            icon="align left"
            iconPosition="left"
            placeholder="Descrição da empresa"
            name="descricao"
            onChange={(e) => this.setState({ descricao: e.target.value })}
          ></Form.Input>
          <Form.Input
            fluid
            icon="twitter"
            iconPosition="left"
            placeholder="Twitter (opcional)"
            name="twitter"
            onChange={(e) => this.setState({ twitter: e.target.value })}
          ></Form.Input>
          <Form.Input
            fluid
            icon="keyboard"
            iconPosition="left"
            placeholder="Seu site (opcional)"
            name="site"
            onChange={(e) => this.setState({ site: e.target.value })}
          ></Form.Input>
        </div>
      );
    } else if (value === "usuario") {
      return (
        <div>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Nome"
            name="nome_sobrenome"
            onChange={(e) => this.setState({ nome: e.target.value })}
          />
          <Form.Input
            fluid
            icon="calendar"
            iconPosition="left"
            placeholder="Data de nascimento"
            name="idade"
            onChange={(e) => this.setState({ idade: e.target.value })}
          />
          <Form.Input
            fluid
            icon="venus mars"
            iconPosition="left"
            placeholder="Gênero"
            name="sexo"
            onChange={(e) => this.setState({ sexo: e.target.value })}
          />
          <Form.Input
            fluid
            icon="mail"
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
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Profissão"
            name="profissao"
            onChange={(e) => this.setState({ profissao: e.target.value })}
          ></Form.Input>
          <Form.Input
            fluid
            icon="align left"
            iconPosition="left"
            placeholder="Sua descrição"
            name="descricao"
            onChange={(e) => this.setState({ descricao: e.target.value })}
          ></Form.Input>
          <Form.Input
            fluid
            icon="twitter"
            iconPosition="left"
            placeholder="Twitter (opcional)"
            name="twitter"
            onChange={(e) => this.setState({ twitter: e.target.value })}
          ></Form.Input>
          <Form.Input
            fluid
            icon="keyboard"
            iconPosition="left"
            placeholder="Seu site (opcional)"
            name="site"
            onChange={(e) => this.setState({ site: e.target.value })}
          ></Form.Input>
        </div>
      );
    } else {
      return;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const value = this.state.value;
    let usuario;

    if (value === "usuario") {
      usuario = {
        nome_sobrenome: this.state.nome,
        idade: this.state.idade,
        sexo: this.state.sexo,
        profissao: this.state.profissao,
        email: this.state.email,
        senha: this.state.senha,
        descricao: this.state.descricao,
        twitter: this.state.twitter,
        site: this.state.site,
      };
    } else if (value === "empresa") {
      usuario = {
        nome: this.state.nome,
        endereco: this.state.endereco,
        email: this.state.email,
        senha: this.state.senha,
        telefone: this.state.telefone,
        descricao: this.state.descricao,
        twitter: this.state.twitter,
        site: this.state.site,
      };
    }

    console.log(usuario);

    api
      .post(`${value}/cadastro`, usuario)
      .then((response) => {
        console.log(response);
        this.setRedirect();
      })
      .catch((err) => {
        console.log(err);
        this.errorMessage(true);
      });
  };

  errorMessage = (isError) => {
    if (isError) {
      return <Message>Endereço inválido</Message>;
    }
  };

  setRedirect = () => {
    this.setState({ redirect: true });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/login?s=true" />;
    }
  };

  render() {
    const { value } = this.state;

    return (
      <div className="corpo">
        <div>
          <Logo />
          <Navbar>
            <NavItem icon={<BsTagFill />} link="/product"></NavItem>
            <NavItem icon={<BsGeoAlt />} link="/map"></NavItem>
            <NavItem icon={<BsChevronDown />}>
              <DropdownMenu />
            </NavItem>
          </Navbar>
        </div>

        <div>{this.errorMessage}</div>

        <Grid
          textAlign="center"
          style={{ height: "70vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450, top: "50px" }}>
            <Header as="h2" color="black" textAlign="center">
              Cadastre-se{" "}
            </Header>

            <Form
              size="large"
              onSubmit={this.handleSubmit}
              style={{ top: "10px" }}
            >
              <Segment stacked>
                <Header as="h3" style={{ display: "flex", alignItens: "left" }}>
                  Você é:
                </Header>
                <Form.Input
                  fluid
                  control={Radio}
                  label="Profissional"
                  icon="user"
                  iconPosition="left"
                  placeholder="Nome"
                  value="usuario"
                  style={{ display: "flex", alignItens: "left" }}
                  onChange={this.handleChange}
                  checked={value === "usuario"}
                />
                <Form.Input
                  fluid
                  control={Radio}
                  label="Empresa"
                  icon="user"
                  iconPosition="left"
                  placeholder="Nome"
                  style={{ display: "flex", alignItens: "left" }}
                  value="empresa"
                  onChange={this.handleChange}
                  checked={value === "empresa"}
                ></Form.Input>

                {this.isUser(value)}

                <br></br>
                <Button color="black" fluid size="large">
                  Cadastrar
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>

        {this.renderRedirect()}
      </div>
    );
  }
}

export default Signup;
