import React, { Component } from "react";
import api from "../../services/api";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { Navbar, NavItem, DropdownMenu, Logo } from "../../components/header";
import { BsChevronDown } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsTagFill } from "react-icons/bs";
import { Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { StorageConnection } from "../../firebase/connectionFB";

export default class UploadImage extends Component {
  state = {
    user: {},
    redirect: false,
    selectedFile: null,
    url: null,
  };

  handleFileChange = (e) => {
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

  uploadToDB = () => {
    api
      .post("/api/profile/" + this.state.user._id, { url: this.state.url })
      .then((res) => {
        console.log(res.data.msg);
      });
  };

  handleFileSubmit = async (e) => {
    e.preventDefault();
    const UploadTask = StorageConnection.ref(
      `images/${this.state.user._id}`
    ).put(this.state.selectedFile);
    UploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        StorageConnection.ref("images")
          .child(this.state.user._id)
          .getDownloadURL()
          .then((url) => {
            this.setState({ url: url });
            this.uploadToDB();
            this.setRedirect();
          });
      }
    );
  };

  componentDidMount() {
    this.getId();
  }

  render() {
    console.log(this.state.selectedFile);
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
                    onChange={this.handleFileChange}
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
