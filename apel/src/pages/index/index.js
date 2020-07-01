import React, { Component } from "react";
import { Navbar, NavItem, DropdownMenu, Logo } from "../../components/header";
import { BsChevronDown } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsTagFill } from "react-icons/bs";
import { Header, Segment, Button, Icon, Grid, Image } from "semantic-ui-react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import "./styles.css";

class Index extends Component {
  state = {
    users: [],
    userInfo: {},
    page: 1,
  };

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async (page = 1) => {
    const response = await api.get(`/usuario?page=${page}`);
    const { docs, ...userInfo } = response.data;
    this.setState({ users: docs, userInfo, page });
  };

  nextPage = () => {
    const { page, userInfo } = this.state;

    if (page === userInfo.pages) return;

    const pageNumber = page + 1;

    this.loadUser(pageNumber);
  };

  prevPage = () => {
    if (this.state.page < 1) return;

    this.loadUser(this.state.page - 1);
  };

  render() {
    const { users, page } = this.state;
    document.body.style.overflow = "scroll";

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
        <Header
          as="h2"
          style={{
            display: "flex",
            alignItens: "center",
            justifyContent: "center",
          }}
        >
          Perfis próximos a você
        </Header>
        <div>
          <div className="product-list">
            {users.map((user) => (
              <article key={user._id}>
                <Header as="h5" style={{ fontSize: "1.3em" }}>
                  <Image
                    style={{ height: "40px", width: "40px" }}
                    src={
                      window.location.origin + "/img/" + user.img.split("\\")[4]
                    }
                    avatar
                  ></Image>
                  <Header.Content> {user.nome_sobrenome}</Header.Content>
                </Header>
                <p>{user.descricao}</p>

                <Link to={`/profilealh?id=${user._id}`}>Acessar</Link>
              </article>
            ))}

            <div className="actions">
              <button disabled={page === 1} onClick={this.prevPage}>
                Anterior
              </button>
              <button
                disabled={page === this.state.userInfo.pages}
                onClick={this.nextPage}
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
