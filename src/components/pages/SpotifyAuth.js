import React, { Component } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default class SpotifyAuth extends Component {
  render() {
    console.log(API_URL);
    return (
      <div>
        <a href={`${API_URL}/spotify/auth/login`}>
          <button type="button">Log in with Spotify</button>
        </a>
      </div>
    );
  }
}
