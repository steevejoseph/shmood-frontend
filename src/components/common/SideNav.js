import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Menu, MenuLabel, MenuList, MenuLink, Container,
} from 'bloomer';
import { selectScreen } from '../../actions';

const SideNav = () => (
  <div style={{ paddingTop: 50 }}>
    <Container isFluid>
      <Menu isPulled="left">
        <MenuLabel>General</MenuLabel>
        <MenuList>
          <li><MenuLink href="/home">Home</MenuLink></li>
        </MenuList>
        <MenuLabel>Playlists</MenuLabel>
        <MenuList>
          <li><MenuLink href="/playlist/new">New Shmood</MenuLink></li>
        </MenuList>
        <MenuLabel>Social</MenuLabel>
        <MenuList>
          <li><MenuLink href="listening-with-you">Listening With You</MenuLink></li>
        </MenuList>
      </Menu>
    </Container>
  </div>

);
const mapStateToProps = state => ({
  selectedScreen: state.screen.selectedScreen,
});

const mapDispatchToProps = {
  selectScreen,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SideNav),
);
