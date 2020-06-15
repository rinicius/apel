import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import {
  BsGearFill,
  BsPersonFill,
  BsFillPersonPlusFill,
  BsChevronBarLeft,
} from "react-icons/bs";
import { isAuthenticated } from "../../services/auth";

import "./styles.css";

export function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

export function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <Link
        to={props.link}
        className="icon-button arrow"
        onClick={() => setOpen(!open)}
      >
        {props.icon}
      </Link>
      {open && props.children}
    </li>
  );
}

export function DropdownMenu() {
  const isAuth = isAuthenticated();
  console.log(isAuth);
  function DropdownItem(props) {
    return (
      <Link to={props.link} className="menu-item">
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </Link>
    );
  }

  if (isAuth == false) {
    return (
      <div className="dropdown">
        <DropdownItem leftIcon={<BsPersonFill />} link="/login">
          <p style={{ color: "#dadce1" }}>Login</p>
        </DropdownItem>
        <DropdownItem leftIcon={<BsFillPersonPlusFill />} link="/signup">
          <p style={{ color: "#dadce1" }}>Cadastre-se</p>
        </DropdownItem>
        <DropdownItem leftIcon={<BsPersonFill />} link="/index">
          <p style={{ color: "#dadce1" }}>Perfis</p>
        </DropdownItem>
        {/* <DropdownItem leftIcon={<BsGearFill />}>Configurações</DropdownItem> */}
      </div>
    );
  } else if (isAuth == true) {
    return (
      <div className="dropdown">
        <DropdownItem leftIcon={<BsPersonFill />} link="/profile">
          <p style={{ color: "#dadce1" }}>Perfil</p>
        </DropdownItem>
        <DropdownItem leftIcon={<BsChevronBarLeft />} link="/home?logout=true">
          <p style={{ color: "#dadce1" }}>Sair</p>
        </DropdownItem>
        <DropdownItem leftIcon={<BsPersonFill />} link="/index">
          <p style={{ color: "#dadce1" }}>Perfis</p>
        </DropdownItem>
        {/* <DropdownItem leftIcon={<BsGearFill />}>Configurações</DropdownItem> */}
      </div>
    );
  }
}

function sticky() {
  const scrolled = false;
  window.addEventListener("scroll", () => {
    const isTop = window.scrollY < 100;

    if (isTop) scrolled = true;
    else scrolled = false;
  });
}

export function Logo() {
  return (
    <Link to="/home" className="logo">
      {" "}
      APEL{" "}
    </Link>
  );
}

/*
    <Logo />
    <Navbar>
      <NavItem icon={<BsTagFill />}></NavItem>
      <NavItem icon={<BsGeoAlt />}></NavItem>
      <NavItem icon={<BsChevronDown />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>

*/

// export default { Navbar, NavItem, DropdownMenu, Logo };
