import React, { Component, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import SpotifyAuth from './SpotifyAuth';

import livemusic from '../../assets/vid/livemusic.mp4';

const Landing = () => (
  <div>
    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
    <video objectFit="cover" autoPlay loop>
      <source src={livemusic} type="video/mp4" />
    </video>
    <SpotifyAuth />
  </div>
);

export default Landing;
