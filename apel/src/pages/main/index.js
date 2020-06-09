import React, { Component } from "react";
import { Navbar, NavItem, DropdownMenu, Logo } from "../../components/header";
import { BsChevronDown } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsTagFill } from "react-icons/bs";
import { Header, Strong } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function Main() {
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
        </div>
      </div>
    </div>
  );
}

export default Main;
