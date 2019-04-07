/* eslint-disable no-cond-assign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, Button, Navbar } from 'reactstrap';
import Helmet from 'react-helmet';
import Spotify from 'spotify-web-api-js';

import PlaylistCard from '../PlaylistCard';
import NewPlaylistForm from '../forms/NewPlaylistForm';

const spotify = new Spotify();

const styles = {
  sideNav: {
    width: 300,
    padding: 10,
    paddingTop: 50,
  },
  sideNavDiv: {
    width: 200,
  },
  navLink: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'left',
  },
  topNav: {
    position: 'absolute',
    width: '100%',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 50,
  },
  playlistDiv: {
    marginTop: 50,
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      playlists: [],
      selectedScreen: 'playlists',
      selectedPlaylists: 'all',
    };

    if (params.access_token) {
      spotify.setAccessToken(params.access_token);
      console.log(`Bearer ${params.access_token}`);
    }

    this.renderPlaylists = this.renderPlaylists.bind(this);
  }

  componentDidMount() {
    spotify.getUserPlaylists().then(data => {
      const playlists = data.items;
      this.setState({ playlists });
    });

    const bgColors = ['#11001C', '#3A015C', '#1B2021', '#9067C6', '#8D86C9'];

    let colCounter = 0;
    this.interval = setInterval(() => {
      const bgcol = bgColors[++colCounter % bgColors.length];
      this.setState(() => ({ bgcol }));
    }, 3000);
  }

  getHashParams() {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;

    const q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  renderPlaylists() {
    const { playlists } = this.state;
    if (playlists) {
      switch (this.state.selectedPlaylists) {
        case 'shmood':
          return this.renderShmoods();
        default:
          return playlists.map(playlist => <PlaylistCard key={playlist.id} playlist={playlist} />);
      }
    }

    return <div>loading...</div>;
  }

  renderScreen() {
    const { playlistDiv } = styles;
    switch (this.state.selectedScreen) {
      case 'newPlaylist':
        return <NewPlaylistForm />;
      case 'listeningWithYou':
      default:
        return (
          <div style={playlistDiv}>
            <ol>{this.renderPlaylists()}</ol>;
          </div>
        );
    }
  }

  renderShmoods() {
    const shmoods = this.state.playlists.filter(playlist => playlist.name.toLowerCase().includes('shmood'));

    if (!shmoods || shmoods.length < 1) {
      return (
        <div>
          You have no shmoods! :(
          <Button onClick={() => this.setState({ selectedScreen: 'newPlaylist' })}>Create one!</Button>
        </div>
      );
    }

    return shmoods.map(playlist => <PlaylistCard key={playlist.id} playlist={playlist} />);
  }

  renderSideNav() {
    const { sideNav, navLink, sideNavDiv } = styles;
    return (
      <div style={sideNavDiv}>
        <Nav vertical pills style={sideNav}>
          <Button color="link" onClick={() => this.setState({ selectedScreen: 'home' })} style={navLink}>
            Home
          </Button>
          <Button color="link" onClick={() => this.setState({ selectedScreen: 'newPlaylist' })} style={navLink}>
            New Playlist
          </Button>
          <Button color="link" onClick={() => this.setState({ selectedScreen: 'home' })} style={navLink}>
            Listening With You
          </Button>
        </Nav>
      </div>
    );
  }

  renderTopNav() {
    const { topNav, navLink } = styles;

    switch (this.state.selectedScreen) {
      case 'newPlaylist':
        return (
          <Navbar style={topNav}>
            <h2 style={{ color: '#fff' }}>New Shmood</h2>
          </Navbar>
        );
      default:
        return (
          <Navbar style={topNav}>
            <Button color="link" onClick={() => this.setState({ selectedPlaylists: 'all' })} style={navLink}>
              All Playlists
            </Button>
            <Button color="link" onClick={() => this.setState({ selectedPlaylists: 'shmood' })} style={navLink}>
              Shmoods
            </Button>
          </Navbar>
        );
    }
  }

  render() {
    return (
      <div>
        {/* <Helmet>
          {/* old, black background */}
        {/* <style>{'body { background-color: #141719; }'}</style> */}
        <style>{`body { background-color:${this.state.bgcol}; transition: 5000ms ease; }`}</style>
        {/* </Helmet> */}
        <div className="container-fluid" style={{ display: 'flex', paddingTop: 50 }}>
          {this.renderTopNav()}
          {this.renderSideNav()}
          {this.renderScreen()}
        </div>
      </div>
    );
  }
}

export default Home;
