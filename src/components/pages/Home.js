/* eslint-disable no-cond-assign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import Helmet from 'react-helmet';

import PlaylistCard from '../PlaylistCard';
import Navbar from '../Navbar';

const spotify = new Spotify();

export default class Home extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      playlists: [],
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

  renderPlaylists() {
    const { playlists } = this.state;
    if (playlists) {
      return playlists.map(playlist => <PlaylistCard key={playlist.id} playlist={playlist} />);
    }

    return <div>loading...</div>;
  }

  render() {
    return (
      <div>
        <Helmet>
          <style>{'body { background-color: #141719; }'}</style>
        </Helmet>
        <div className="container-fluid" style={{ display: 'flex', paddingTop: 50 }}>
          <Navbar />
          <ol>{this.renderPlaylists()}</ol>
        </div>
      </div>
    );
  }
}
