import React, { Component } from "react";
import { Navbar, NavItem, DropdownMenu, Logo } from "../../components/header";
import { BsChevronDown } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsTagFill } from "react-icons/bs";
import { Header, Segment, Icon, Grid, Image } from "semantic-ui-react";
import api from "../../services/api";
import * as qs from "query-string";

import "semantic-ui-css/semantic.min.css";

class Profilealh extends Component {
  state = {
    user: {},
    model: {},
    path: null,
    id: "",
  };

  //5edae43cf24682268c4fff64

  getModel = async () => {
    api
      .get(`show/${qs.parse(window.location.search).id}`)
      .then((res) => {
        this.setState({ model: res.data });
        this.setState({ path: this.state.model.img });
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  CheckSign = () => {
    const id = qs.parse(window.location.search);
    this.setState({ id });
  };

  componentDidMount() {
    this.getModel();
  }

  render() {
    console.log(this.state.id);

    return (
      <div>
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

        <div>
          <div>
            <div
              style={{
                background: "#1b1c1d",
                height: "30vh",
                width: "100%",
                zIndex: "9",
              }}
            ></div>
            <Segment style={{ top: "-50px" }}>
              <Grid
                columns={2}
                relaxed="very"
                style={{ padding: "1em 0em 0em 15em" }}
              >
                <Grid.Row style={{ top: "-140px" }}>
                  <Grid.Column>
                    <Image
                      src={this.state.path} //////////////////////////////////////////
                      rounded
                      style={{ height: "240px", width: "240px" }}
                    ></Image>
                    <br />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ top: "-170px" }}>
                  <Grid.Column style={{ padding: "0em 0em 0em 2.5em" }}>
                    <Header as="h1" style={{ color: "#242526" }}>
                      {"nome_sobrenome" in this.state.model
                        ? this.state.model.nome_sobrenome
                        : this.state.model.nome}
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ top: "-175px" }}>
                  <Grid.Column style={{ padding: "0em 0em 0em 2.5em" }}>
                    <Header
                      as="h4"
                      style={{
                        color: "#242526",
                        position: "relative",
                        top: "-20px",
                      }}
                    >
                      {this.state.model.descricao}
                    </Header>
                    <div>
                      <Header as="h5" size="tiny" style={{ fontSize: "0.9em" }}>
                        <Icon name="twitter" circular />
                        <Header.Content>
                          {this.state.model.twitter}
                        </Header.Content>
                      </Header>
                      <Header
                        as="h5"
                        size="tiny"
                        style={{
                          position: "relative",
                          top: "-20px",
                          fontSize: "0.9em",
                        }}
                      >
                        <Icon name="share" circular />
                        <Header.Content>{this.state.model.site}</Header.Content>
                      </Header>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>{" "}
            </Segment>
          </div>
        </div>
      </div>
    );
  }
}
export default Profilealh;
