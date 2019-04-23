import React, { Component } from 'react';
import { Title } from 'bloomer';
import querystring from 'querystring';

const API_URL = process.env.REACT_APP_API_URL;

const styles = {
  content: {
    width: '200px',
    height: '30px',
    color: 'white',
    zIndex: 1,
    position: 'absolute',
    top: '45%',
    left: '43%',
    background: 'rgba(0, 0, 0, 0.0)',
    textAlign: 'center',
  },

  oldcontent: {
    position: 'relative',
    bottom: '50%',
    // top: '30vh',
    background: 'rgba(0, 0, 0, 0.0)',
    color: '#f1f1f1',
    width: '100%',
    // padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    fontSize: 18,
    padding: 10,
    border: 'none',
    // background: '#000',
    color: '#fff',
    // background: 'rgba(0, 0, 0, 0.1)',
    background: 'rgba(0, 0, 0, 0.0)',
    cursor: 'pointer',
    borerRadius: 10,
  },
};

export default class SpotifyAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggingIn: false,
    };

    // will have localhost:3000 as a param in querystring if on dev, else heroku.
    this.loginUrl = `${API_URL}/spotify/auth/login?${querystring.stringify({ srcUrl: window.location.href })}`;
  }

  renderButton() {
    const { loggingIn } = this.state;
    if (loggingIn) {
      return (
        <div style={styles.content}>
          <Title>logging into Spotify...</Title>
        </div>
      );
    }

    return (
      <div style={styles.content}>
        <a href={this.loginUrl}>
          <button onClick={() => this.setState({ loggingIn: true })} style={styles.button} type="button">
            <Title>join the fun</Title>
          </button>
        </a>
      </div>
    );
  }

  render() {
    return <div>{this.renderButton()}</div>;
  }
}
