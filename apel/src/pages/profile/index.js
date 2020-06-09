import React, { Component } from "react";
import { Navbar, NavItem, DropdownMenu, Logo } from "../../components/header";
import { BsChevronDown } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsTagFill } from "react-icons/bs";

function Profile() {
  return (
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
  );
}

export default Profile;
