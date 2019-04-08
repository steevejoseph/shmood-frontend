/* eslint-disable no-cond-assign */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Spotify from 'spotify-web-api-js';

import NewPlaylistForm from '../forms/NewPlaylistForm';
import { setUserData, getUserData, refreshTokens, getHashParams } from '../../assets/scripts/spotify/auth';
import { TopNav, SideNav, PlaylistScreen } from '../common';
import ListeningWithYou from './ListeningWithYou/ListeningWithYou';

const spotify = new Spotify();

const styles = {
  screenDiv: {
    marginTop: 50,
  },
};
class Home extends Component {
  constructor(props) {
    super(props);
    const params = getHashParams();
    this.state = {
      playlists: [],
    };

    if (params.access_token) {
      setUserData('spotifyAccessToken', params.access_token);
      setUserData('spotifyRefreshToken', params.refresh_token);
      const spotifyTokenExpirationTime = `${new Date().getTime() + params.expires_in * 1000}`;
      setUserData('spotifyTokenExpirationTime', spotifyTokenExpirationTime);
      spotify.setAccessToken(params.access_token);
      console.log(`Bearer ${params.access_token}`);
    }
  }

  async componentDidMount() {
    const spotifyTokenExpirationTime = getUserData('spotifyTokenExpirationTime');

    // user should have a token exp time, if not, redirect to login
    if (!spotifyTokenExpirationTime) {
      console.log('redirec needed!');
    } else if (`${new Date().getTime()}` > getUserData('spotifyTokenExpirationTime')) {
      // token is old, need to refresh
      await refreshTokens();
    }

    spotify.getUserPlaylists().then(data => {
      const playlists = data.items;
      this.setState({ playlists });
    });

    const bgColors = ['#11001C', '#3A015C', '#1B2021', '#353950', '#5f432b', '#274d61'];

    let colCounter = 0;
    this.interval = setInterval(() => {
      const bgcol = bgColors[++colCounter % bgColors.length];
      this.setState(() => ({ bgcol }));
    }, 3000);
  }

  renderScreen() {
    console.log(this.props.selectedScreen);
    switch (this.props.selectedScreen) {
      case 'newPlaylist':
        return <NewPlaylistForm />;
      case 'listeningWithYou':
        return <ListeningWithYou />;
      default:
        return <PlaylistScreen playlists={this.state.playlists} />;
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
          <TopNav />
          <SideNav />
          <div style={styles.screenDiv}>{this.renderScreen()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedScreen: state.screen.selectedScreen,
});

export default connect(mapStateToProps)(Home);
