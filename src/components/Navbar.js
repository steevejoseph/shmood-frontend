import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const styles = {
  div: {
    width: '80em',
    padding: 10,
  },
  navLink: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 600,
  },
};
export default class Navbar extends Component {
  render() {
    const { div, navLink } = styles;
    return (
      <div style={div}>
        <Nav vertical pills>
          <NavItem>
            <NavLink href="#" style={navLink}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" style={navLink}>
              New Playlist
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" style={navLink}>
              Listening With You
            </NavLink>
          </NavItem>
          {/*
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem> */}
        </Nav>
      </div>
    );
  }
}
