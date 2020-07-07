import React, { Component } from "react";
import api from "../../services/api";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { Navbar, NavItem, DropdownMenu, Logo } from "../../components/header";
import { BsChevronDown } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsTagFill } from "react-icons/bs";
import { Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

export default class UploadImage extends Component {
  state = {
    user: {},
    redirect: false,
    selectedFile: null,
  };

  handleFile = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  getId = async () => {
    const token = localStorage.getItem("currentUser");
    api
      .post("/decode", { token })
      .then((res) => {
        this.setState({ user: res.data.decode });
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setRedirect = () => {
    this.setState({ redirect: true });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/profile" />;
    }
  };

  handleFileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "avatar",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    api
      .post(`/profile/${this.state.user._id}`, formData, config)
      .then((res) => {
        console.log(res.data);
        this.setRedirect();
        console.log(this.state.redirect);
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getId();
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
          <Grid
            textAlign="center"
            style={{ height: "70vh" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="black" textAlign="center">
                Foto de perfil
              </Header>
              <Form
                size="large"
                enctype="multipart/form-data"
                onSubmit={this.handleFileSubmit}
              >
                <Segment stacked>
                  <Form.Input
                    fluid
                    type="file"
                    name="avatar"
                    onChange={this.handleFile}
                  ></Form.Input>

                  <Button color="black" fluid size="large">
                    Enviar
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
          {this.renderRedirect()}
        </div>
      </div>
    );
  }
}
