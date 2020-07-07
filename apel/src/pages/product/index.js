import React, { useState } from "react";
import api from "../../services/api";
import { Redirect } from "react-router-dom";
import { Navbar, NavItem, DropdownMenu, Logo } from "../../components/header";
import { BsChevronDown } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsTagFill } from "react-icons/bs";
import * as qs from "query-string";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

const Insert = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    const produto = {
      nome,
      descricao,
      tipo,
      localizacao,
    };
    api
      .post("/produto/cadastro", produto)
      .then((res) => {
        console.log(res);
        setNome("");
        setDescricao("");
        setLocalizacao("");
        setTipo("");
        setRedirect(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {redirect && <Redirect to="/product?cad=true" />}
      <div>
        <Logo />
        <Navbar>
          <NavItem icon={<BsTagFill />} link="/product"></NavItem>
          <NavItem icon={<BsGeoAlt />} link="/map"></NavItem>
          <NavItem icon={<BsChevronDown />}>
            <DropdownMenu />
          </NavItem>
        </Navbar>
        {CheckSign()}
      </div>

      <div>
        <Grid
          textAlign="center"
          style={{ height: "70vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450, top: "20px" }}>
            <Header as="h2" color="black" textAlign="center">
              Cadastre um produto em falta da sua região{" "}
              <Header
                as="h4"
                color="black"
                textAlign="left"
                style={{ margin: "25px 0 0 0" }}
              >
                Faça com que empreendedores vejam a necessidade da sua cidade
              </Header>
            </Header>

            <Form size="large" onSubmit={handleSubmit} style={{ top: "20px" }}>
              <Segment stacked>
                <Header as="h3" style={{ display: "flex", alignItens: "left" }}>
                  Dados do produto:
                </Header>
                <Form.Input
                  fluid
                  icon="genderless"
                  iconPosition="left"
                  placeholder="Nome do produto"
                  name="nome"
                  onChange={(e) => setNome(e.target.value)}
                  value={nome}
                />
                <Form.Input
                  fluid
                  icon="align left"
                  iconPosition="left"
                  placeholder="Descrição do produto"
                  name="descricao"
                  onChange={(e) => setDescricao(e.target.value)}
                  value={descricao}
                />
                <Form.Input
                  fluid
                  icon="location arrow"
                  iconPosition="left"
                  placeholder="Cidade (sem acentos)"
                  name="cidade"
                  onChange={(e) => setLocalizacao(e.target.value)}
                  value={localizacao}
                ></Form.Input>
                <Form.Input
                  fluid
                  icon="tag"
                  iconPosition="left"
                  placeholder="Tipo do produto"
                  name="tipo"
                  onChange={(e) => setTipo(e.target.value)}
                  value={tipo}
                ></Form.Input>

                <br></br>
                <Button color="black" fluid size="large">
                  Cadastrar
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

const CheckSign = () => {
  const parsed = qs.parse(window.location.search);

  if (parsed.cad === "true") {
    return (
      <Message size="tiny" style={{ top: "-12px" }}>
        Produto adicionado
      </Message>
    );
  }
};
export default Insert;
