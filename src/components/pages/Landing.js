import React, { Component } from 'react';
import SpotifyAuth from './SpotifyAuth';
import Helmet from 'react-helmet';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Helmet>
          <style>{'body { background-color: #141719; }'}</style>
        </Helmet>
        <SpotifyAuth />
      </div>
    );
  }
}
