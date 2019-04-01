import React, { Component } from 'react';
import axios from 'axios';

import livemusic from '../../assets/vid/livemusic.mp4';

const API_URL = process.env.REACT_APP_API_URL;


const styles = {
  
  content: {
    position: 'absolute',
    bottom: '50%',
    background: 'rgba(0, 0, 0, 0.0)',
    color: '#f1f1f1',
    width: '100%',
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button:{
    width: 200,
    fontSize: 18,
    padding: 10,
    border: 'none',
    background: '#000',
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    borerRadius: 10
  }
}

export default class SpotifyAuth extends Component {
  render() {
    return (
      <div>
        <video width={'100%'} height={'100%'}  minHeight="100%" minWidth="100%" autoPlay loop>
          <source src={livemusic} type="video/mp4"></source>
        </video>
        <div style={styles.content}>
          <a href={`#`}>
        {/* <a href={`${API_URL}/spotify/auth/login`}> */}
            <button style={styles.button}type="button">join the fun</button>
          </a>
        </div>

      </div>
    );
  }
}
