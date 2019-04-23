import React from 'react';
import {
  Container,
  Hero,
  HeroHeader,
  HeroBody,
  HeroFooter,
  HeroVideo,
  Icon,
  NavbarItem,
  NavbarEnd,
  NavbarMenu,
  NavbarBrand,
  Navbar,
} from 'bloomer';
import SpotifyAuth from './SpotifyAuth';
import livemusic from '../../assets/vid/livemusic.mp4';

const Landing = () => (
  <Hero isColor="black" isFullHeight>
    <HeroHeader>
      <Navbar>
        <Container>
          <NavbarBrand>
            <NavbarItem>
              <div className="title">SHMOOD</div>
            </NavbarItem>
            <NavbarItem href="http://github.com/steevejoseph/shmood-frontend" isHidden="desktop">
              <Icon className="fa fa-github fa-lg" />
            </NavbarItem>
          </NavbarBrand>
          <NavbarMenu>
            <NavbarEnd>
              {/* <NavbarItem href="/home">Home</NavbarItem>
                  <NavbarItem href="/">About</NavbarItem> */}
              <NavbarItem href="http://github.com/steevejoseph/shmood-frontend">
                <Icon className="fa fa-github fa-lg" />
              </NavbarItem>
            </NavbarEnd>
          </NavbarMenu>
        </Container>
      </Navbar>
    </HeroHeader>
    <HeroBody>
      <SpotifyAuth />
      <HeroVideo isTransparent src={livemusic}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video autoPlay loop>
          <source src={livemusic} />
        </video>
      </HeroVideo>
    </HeroBody>
    <HeroFooter />
  </Hero>
);

export default Landing;
