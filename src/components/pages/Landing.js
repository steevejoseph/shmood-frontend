import React from 'react';
import SpotifyAuth from './SpotifyAuth';

import livemusic from '../../assets/vid/livemusic.mp4';

const Landing = () => (
  <div>
    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
    <video autoPlay loop>
      {/*  objectFit="cover" */}
      <source src={livemusic} type="video/mp4" />
    </video>
    <SpotifyAuth />
  </div>
);

export default Landing;
