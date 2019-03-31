import React, { Component } from 'react';
import axios from 'axios';

import livemusic from '../../assets/vid/livemusic.mp4';

const API_URL = process.env.REACT_APP_API_URL;

export default class SpotifyAuth extends Component {
  render() {
    return (
      <div>
        <video width={'100%'} autoPlay loop>
          <source src={livemusic} type="video/mp4"></source>
        </video>
        <a href={`${API_URL}/spotify/auth/login`}>
          <button type="button">Log in with Spotify</button>
        </a>
      </div>
    );
  }
}
