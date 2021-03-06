import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavItem, DropdownMenu, Logo } from "../../components/header";
import { BsChevronDown } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsTagFill } from "react-icons/bs";
import {
  Header,
  Segment,
  Button,
  Icon,
  Grid,
  Divider,
  Message,
} from "semantic-ui-react";
import { isAuthenticated } from "../../services/logout";
import * as qs from "query-string";

import "semantic-ui-css/semantic.min.css";

const CheckSign = () => {
  const parsed = qs.parse(window.location.search);

  if (parsed.islog === "true") {
    return <Message size="tiny">Logado</Message>;
  }
  if (parsed.islog === "false") {
    return (
      <Message size="tiny">
        Você precisa estar logado para acessar essa página
      </Message>
    );
  }
  if (parsed.logout === "true") {
    isAuthenticated();
    return <Message size="tiny">Deslogado com sucesso</Message>;
  }
};

function Main() {
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
      <div>{CheckSign()}</div>
      <div
        className="ui inverted vertical center aligned segment"
        style={{ height: "570px", padding: "0.1em 0em" }}
      >
        <div className="ui text container">
          <h1
            className="ui inverted header"
            style={{
              fontSize: "3.8em",
              fontWeight: "normal",
              marginBottom: "0px",
              marginTop: "2em",
            }}
          >
            <strong>A</strong>ssociação de <strong>P</strong>
            rodutos e <strong>E</strong>mpreendedores <strong>L</strong>ivres
          </h1>

          <h2
            className="ui inverted header"
            style={{
              fontSize: "2em",
              fontWeight: "normal",
              marginTop: "1.5em",
            }}
          >
            Tenha as melhores informações ao empreender. Ajude trabalhadores e
            se ajude.
          </h2>
          <Link to="/map">
            <Button primary size="huge" children={<Link to="/map"></Link>}>
              Comece agora
              <Icon name="right arrow" />
            </Button>
          </Link>
        </div>
      </div>

      <Segment style={{ padding: "2em 5em 3.2em 5em" }}>
        <Grid columns={2} relaxed="very">
          <Grid.Row>
            <Grid.Column style={{ padding: "0em 0em 0em 5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                {" "}
                Daremos as informações necessárias{" "}
              </Header>
              <p>
                Nossa plataforma possui diversas informações sobre negócios —
                devido aos nossos usuários — em todas específicas de sua região:
                concorrências, quantidade de profissionais, demanda de
                produtos...
              </p>
            </Grid.Column>
            <Grid.Column style={{ padding: "0em 0em 0em 5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                {" "}
                Gratuito{" "}
              </Header>
              <p>
                O uso da plataforma é gratuito. As informações servirão de
                contribuição para o nosso funcionamento.{" "}
              </p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column style={{ padding: "0em 0em 0em 5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                {" "}
                Para empresas e trabalhadores{" "}
              </Header>
              <p>
                Divisões de conteúdo para empresas e usuários, dando mais
                organização para a distribuição da informação e dando melhor
                auxílio aos dois.
              </p>
            </Grid.Column>
            <Grid.Column style={{ padding: "0em 0em 0em 5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                {" "}
                Construa a estratégia do seu negócio{" "}
              </Header>
              <p>
                Use nossa plataforma para construir seu negócio facilmente,
                utilizando as informações para planejar e montar seu plano de
                negócio.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider vertical> + </Divider>
      </Segment>
    </div>
  );
}

export default Main;
