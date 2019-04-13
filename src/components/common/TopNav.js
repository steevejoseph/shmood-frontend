import React, { Component } from 'react';
import { Button, Navbar } from 'reactstrap';
import { connect } from 'react-redux';
import { selectPlaylistCategory } from '../../actions';

const styles = {
  navLink: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 20,
  },
  topNav: {
    position: 'absolute',
    width: '100%',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 50,
  },
};

class TopNav extends Component {
  render() {
    const { topNav, navLink } = styles;

    switch (this.props.selectedScreen) {
      case 'newPlaylist':
        return (
          <Navbar style={topNav}>
            <h2 style={{ color: '#fff' }}>New Shmood</h2>
          </Navbar>
        );
      case 'listeningWithYou':
        return (
          <Navbar style={topNav}>
            <h2 style={{ color: '#fff' }}>Users Listening In Your Area</h2>
          </Navbar>
        );
      default:
        return (
          <Navbar style={topNav}>
            <Button color="link" onClick={() => this.props.selectPlaylistCategory('')} style={navLink}>
              <h2>All Playlists</h2>
            </Button>
            <Button color="link" onClick={() => this.props.selectPlaylistCategory('shmood')} style={navLink}>
              <h2>Shmoods</h2>
            </Button>
          </Navbar>
        );
    }
  }
}

const mapStateToProps = state => ({
  selectedPlaylistCategory: state.screen.selectedPlaylistCategory,
  selectedScreen: state.screen.selectedScreen,
});

const mapDispatchToProps = {
  selectPlaylistCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNav);
