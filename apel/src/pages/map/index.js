import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Navbar, NavItem, DropdownMenu, Logo } from "../../components/header";
import { BsChevronDown } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsTagFill } from "react-icons/bs";
import "./styles.css";

export default class classeMapa extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    empresas: [],
  };

  componentDidMount() {
    this.loadEmpresas();
  }

  loadEmpresas = async () => {
    const empresas = await api.get("/empresas/");
    this.setState({ empresas: empresas.data });
  };

  // [51.505, -0.09]
  render() {
    const { empresas } = this.state;
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
        <Map className="mapa" center={[-22.872409, -47.210676]} zoom={17}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {empresas.map((values) => (
            <Marker position={values.endereco}>
              <Popup key={values._id}>
                {values.nome}
                <br />
                {values.descricao}
                <br />
                <br />

                <Link to={"/profilealh?id=" + values._id}>Acessar Perfil</Link>
              </Popup>
            </Marker>
          ))}
        </Map>
      </div>
    );
  }
}
