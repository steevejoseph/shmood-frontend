/* eslint-disable no-cond-assign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Spotify from 'spotify-web-api-js';
import { withRouter } from 'react-router-dom';

import { getUserData, checkInitialLogin, refreshTokensIfExpired } from '../../assets/scripts/spotify/auth';
import { TopNav, SideNav, PlaylistScreen } from '../common';
import { selectScreen } from '../../actions';

const spotify = new Spotify();

const styles = {
  screenDiv: {
    marginTop: 50,
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };

    const accessToken = checkInitialLogin();
    if (accessToken) {
      spotify.setAccessToken(accessToken);
      // console.log(`Bearer ${accessToken}`);
      this.props.history.push('/home');
    }
  }

  componentWillMount() {
    this.props.selectScreen('home');
  }

  componentDidMount() {
    const spotifyTokenExpirationTime = getUserData('spotifyTokenExpirationTime');

    if (!spotifyTokenExpirationTime) {
      this.props.history.push('/');
    }

    refreshTokensIfExpired();
    spotify.setAccessToken(getUserData('spotifyAccessToken'));

    // might need a .catch() if req fails...
    // refresh token?
    spotify.getUserPlaylists().then(data => {
      const playlists = data.items;
      this.setState({ playlists });
    });
  }

  render() {
    return (
      <div>
        <Helmet>
          <style>{'body { background-color: #141719; }'}</style>
        </Helmet>
        <div className="container-fluid" style={{ display: 'flex', paddingTop: 50 }}>
          <TopNav />
          <SideNav />
          <div style={styles.screenDiv}>
            <PlaylistScreen playlists={this.state.playlists} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedScreen: state.screen.selectedScreen,
});

export default withRouter(
  connect(
    mapStateToProps,
    { selectScreen }
  )(Home)
);
