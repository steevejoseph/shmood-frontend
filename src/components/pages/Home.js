/* eslint-disable no-cond-assign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, Button } from 'reactstrap';
import Helmet from 'react-helmet';
import Spotify from 'spotify-web-api-js';

import PlaylistCard from '../PlaylistCard';
import NewPlaylistForm from '../forms/NewPlaylistForm';

const spotify = new Spotify();

const styles = {
  navDiv: {
    width: 200,
    padding: 10,
  },
  navLink: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'left',
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      playlists: [],
      selectedScreen: 'playlists',
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

  renderNavbar() {
    const { navDiv, navLink } = styles;
    return (
      <div style={navDiv}>
        <Nav vertical pills>
          <Button color="link" onClick={() => this.setState({ selectedScreen: 'home' })} style={navLink}>
            Home
          </Button>
          <Button color="link" onClick={() => this.setState({ selectedScreen: 'newPlaylist' })} style={navLink}>
            New Playlist
          </Button>
          <Button color="link" onClick={() => this.setState({ selectedScreen: 'listeningWithYou' })} style={navLink}>
            Listening With You
          </Button>
        </Nav>
      </div>
    );
  }

  renderPlaylists() {
    const { playlists } = this.state;
    if (playlists) {
      return playlists.map(playlist => <PlaylistCard key={playlist.id} playlist={playlist} />);
    }

    return <div>loading...</div>;
  }

  renderScreen() {
    switch (this.state.selectedScreen) {
      case 'newPlaylist':
        return <NewPlaylistForm />;
      case 'listeningWithYou':
      default:
        return <ol>{this.renderPlaylists()}</ol>;
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <style>{'body { background-color: #141719; }'}</style>
        </Helmet>
        <div className="container-fluid" style={{ display: 'flex', paddingTop: 50 }}>
          {this.renderNavbar()}
          {this.renderScreen()}
        </div>
      </div>
    );
  }
}

export default Home;
