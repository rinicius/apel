import React, { Component } from "react";
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
  Image,
  Form,
} from "semantic-ui-react";
import api from "../../services/api";
import { Link } from "react-router-dom";
// import image from "../../uploads/";

import "semantic-ui-css/semantic.min.css";

class Profile extends Component {
  state = {
    user: {},
    model: {},
    path: [],
    editOn: false,
    buttonOn: true,
  };

  getModel = async () => {
    api
      .get(`show/${this.state.user._id}`)
      .then((res) => {
        this.setState({ model: res.data });
        this.setState({ path: this.state.model.img });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmit = () => {
    console.log(this.state.model);

    const {
      nome_sobrenome,
      idade,
      sexo,
      profissao,
      email,
      senha,
      descricao,
      twitter,
      site,
    } = this.state.model;

    const model = {
      nome_sobrenome,
      idade,
      sexo,
      profissao,
      email,
      senha,
      descricao,
      twitter,
      site,
    };
    api
      .put(`${this.state.user.tipo}/editar`, {
        user: model,
        id: this.state.user._id,
      })
      .then((res) => {
        this.setState({ editOn: !this.state.editOn });
        this.setState({ buttonOn: !this.state.buttonOn });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setEdit = () => {
    this.setState({ editOn: !this.state.editOn });
    this.setState({ buttonOn: !this.state.buttonOn });
  };

  Token = async () => {
    const token = localStorage.getItem("currentUser");
    api
      .post("/decode", { token })
      .then((res) => {
        this.setState({ user: res.data.decode });
        this.getModel();
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.Token();
  }

  render() {
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
                      src={this.state.path}
                      rounded
                      style={{ height: "240px", width: "240px" }}
                    ></Image>
                    <br />
                    <Button as={Link} to="/upload">
                      Mudar imagem de perfil
                    </Button>
                    <br />
                    <br />
                    {this.state.buttonOn && (
                      <Button onClick={this.setEdit}>Editar perfil</Button>
                    )}
                    {this.state.editOn && (
                      <div style={{ marginTop: "10px" }}>
                        <Form.Input
                          fluid
                          icon="user"
                          iconPosition="left"
                          placeholder="Descrição"
                          name="nome"
                          style={{
                            width: "300px",
                            marginBottom: "10px",
                          }}
                          value={this.state.model.descricao}
                          onChange={(e) =>
                            this.setState({
                              model: {
                                ...this.state.model,
                                descricao: e.target.value,
                              },
                            })
                          }
                        />

                        <Form.Input
                          fluid
                          icon="user"
                          iconPosition="left"
                          placeholder="Nome"
                          name="nome"
                          style={{ width: "300px", marginBottom: "10px" }}
                          value={
                            this.state.user.tipo === "usuario"
                              ? this.state.model.nome_sobrenome
                              : this.state.model.nome
                          }
                          onChange={(e) => {
                            if (this.state.user.tipo === "usuario") {
                              this.setState({
                                model: {
                                  ...this.state.model,
                                  nome_sobrenome: e.target.value,
                                },
                              });
                            } else {
                              this.setState({
                                model: {
                                  ...this.state.model,
                                  nome: e.target.value,
                                },
                              });
                            }
                          }}
                        />

                        <Form.Input
                          fluid
                          icon="user"
                          iconPosition="left"
                          placeholder="Profissão"
                          name="nome"
                          style={{ width: "300px", marginBottom: "10px" }}
                          value={this.state.model.profissao}
                          onChange={(e) =>
                            this.setState({
                              model: {
                                ...this.state.model,
                                profissao: e.target.value,
                              },
                            })
                          }
                        />

                        <Form.Input
                          fluid
                          icon="user"
                          iconPosition="left"
                          placeholder="Twitter"
                          name="nome"
                          style={{ width: "300px", marginBottom: "10px" }}
                          value={this.state.model.twitter}
                          onChange={(e) =>
                            this.setState({
                              model: {
                                ...this.state.model,
                                twitter: e.target.value,
                              },
                            })
                          }
                        />

                        <Form.Input
                          fluid
                          icon="user"
                          iconPosition="left"
                          placeholder="Site"
                          name="nome"
                          style={{ width: "300px", marginBottom: "10px" }}
                          value={this.state.model.site}
                          onChange={(e) =>
                            this.setState({
                              model: {
                                ...this.state.model,
                                site: e.target.value,
                              },
                            })
                          }
                        />

                        <div style={{ flexDirection: "row" }}>
                          <Button secondary onClick={this.handleSubmit}>
                            Salvar
                          </Button>

                          <Button primary onClick={this.setEdit}>
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    )}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ top: "-140px" }}>
                  <Grid.Column style={{ padding: "0em 0em 0em 2.5em" }}>
                    <Header as="h1" style={{ color: "#242526" }}>
                      {this.state.user.tipo === "usuario"
                        ? this.state.model.nome_sobrenome
                        : this.state.model.nome}
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ top: "-145px" }}>
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
export default Profile;
