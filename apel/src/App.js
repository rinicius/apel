import React, { useState } from "react";
import "./App.css";
import Routes from "./routes/routes";
import { CSSTransition } from "react-transition-group";

import { BsChevronDown } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsTagFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { BsGearFill } from "react-icons/bs";

function App() {
  return (
    <div className="App">
      <Logo />
      <Navbar>
        <NavItem icon={<BsTagFill />}></NavItem>
        <NavItem icon={<BsGeoAlt />}></NavItem>
        <NavItem icon={<BsChevronDown />}>
          <DropdownMenu />
        </NavItem>
      </Navbar>
      <Routes />
    </div>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item">
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropdown">
      <DropdownItem leftIcon={<BsPersonFill />}> Perfil</DropdownItem>
      <DropdownItem leftIcon={<BsGearFill />}>Configurações</DropdownItem>
    </div>
  );
}

function Logo() {
  return (
    <a href="#" className="logo">
      {" "}
      APEL{" "}
    </a>
  );
}

export default App;
