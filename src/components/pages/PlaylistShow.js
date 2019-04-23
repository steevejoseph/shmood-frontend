import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import Spinner from 'react-spinkit';
import { getUserData, refreshTokensIfExpired } from '../../assets/scripts/spotify/auth';
import { PlaylistCard, SideNav } from '../common';
import { Columns, Container } from 'bloomer';

const spotify = new Spotify();

const styles = {
  screenDiv: {
    marginTop: 50,
  },
};
export default class PlaylistShow extends Component {
  state = {
    playlist: null,
    loading: true,
  };

  constructor(props) {
    super(props);
    const spotifyTokenExpirationTime = getUserData('spotifyTokenExpirationTime');
    if (!spotifyTokenExpirationTime) {
      this.props.history.push('/');
    }
    refreshTokensIfExpired();
    spotify.setAccessToken(getUserData('spotifyAccessToken'));

    const playlistId = this.props.match.params.id;

    spotify
      .getPlaylist(playlistId)
      .then(res => {
        this.setState({ playlist: res });
      })
      .catch(err => {
        console.log('Error fetching new playlist', err);
        this.props.history.push('/home');
      });

    if (this.state.loading) {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1500);
    }
  }

  renderPlaylist() {
    if (!this.state.playlist || this.state.loading) {
      return (
        <div>
          <Spinner name="line-scale" color="white" />
        </div>
      );
    }

    return (
      <Container>
        <PlaylistCard colSize="1" playlist={this.state.playlist} />
      </Container>
);
  }

  render() {
    return (
      <div>
          <SideNav />
          <Columns>{this.renderPlaylist()}</Columns>
        </div>
    );
  }
}
