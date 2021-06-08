import React, { useState } from 'react';
import {NavLink} from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap';

const NavBar = (props) => {

  return (
    <div className="bg-dark">
      <Nav pills className="p-3 h3">
        <NavItem className="m-auto mt-2">
          <NavLink to="/" exact activeStyle={{ color: 'red', textDecoration:'none' }} className="text-decoration-none">Home</NavLink>
        </NavItem>
        <NavItem className="m-auto mt-2">
          <NavLink to="/about" exact activeStyle={{ color: 'red', textDecoration:'none'}} className="text-decoration-none">About</NavLink>
        </NavItem>
        <NavItem className="m-auto mt-2">
          <NavLink to="/register" exact activeStyle={{ color: 'red', textDecoration:'none'}} className="text-decoration-none">Register</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default NavBar;