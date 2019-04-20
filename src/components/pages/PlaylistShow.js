import React, { Component } from 'react';

import Spotify from 'spotify-web-api-js';
import { getUserData, refreshTokensIfExpired } from '../../assets/scripts/spotify/auth';
import { PlaylistCard } from '../common';

const spotify = new Spotify();

export default class PlaylistShow extends Component {
  state = {
    playlist: null,
    loading: this.props.history.location.state.loading,
  };

  constructor(props) {
    console.log(props);
    super(props);
    // console.log('props', this.props);
    const spotifyTokenExpirationTime = getUserData('spotifyTokenExpirationTime');
    // user should have a token exp time, if not, redirect to login
    if (!spotifyTokenExpirationTime) {
      this.props.history.push('/');
    }
    refreshTokensIfExpired();
    spotify.setAccessToken(getUserData('spotifyAccessToken'));

    const playlistId = this.props.match.params.id;

    spotify.getPlaylist(playlistId).then(res => {
      console.log(res);
      this.setState({ playlist: res });
    });

    if (this.state.loading) {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 3000);
    }
  }

  componentDidMount() {
    // window.location.reload();
    // this.props.history.push(`/playlist/${playlistId}`);
  }

  renderPlaylist() {
    if (!this.state.playlist || this.state.loading) {
      return <div>loading...</div>;
    }
    return <PlaylistCard playlist={this.state.playlist} />;
  }

  render() {
    return <div>{this.renderPlaylist()}</div>;
  }
}
