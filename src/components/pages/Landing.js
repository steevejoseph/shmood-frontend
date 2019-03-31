import React, { Component } from 'react';
import SpotifyAuth from './SpotifyAuth';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <SpotifyAuth />
      </div>
    );
  }
}
