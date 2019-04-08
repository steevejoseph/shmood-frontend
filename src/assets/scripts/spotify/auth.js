import axios from 'axios';
import { encode as btoa } from 'base-64';

const scopesArr = [
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-library-modify',
  'user-library-read',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-read-recently-played',
  'user-top-read',
];

const scopes = scopesArr.join(' ');
const API_URL = process.env.REACT_APP_API_URL;

export const getSpotifyCredentials = async () => {
  const res = await axios.get(`${API_URL}/spotify/auth/get-credentials`);
  const spotifyCredentials = res.data;
  return spotifyCredentials;
};

export const refreshTokens = async () => {
  try {
    const credentials = await getSpotifyCredentials(); // we wrote this function above
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    const refreshToken = getUserData('spotifyRefreshToken');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      // await getTokens();
    } else {
      const { access_token: newAccessToken, refresh_token: newRefreshToken, expires_in: expiresIn } = responseJson;

      const spotifyTokenExpirationTime = `${new Date().getTime() + expiresIn * 1000}`;
      setUserData('spotifyAccessToken', newAccessToken);
      if (newRefreshToken) {
        setUserData('spotifyRefreshToken', newRefreshToken);
      }
      setUserData('spotifyTokenExpirationTime', spotifyTokenExpirationTime);
    }
  } catch (err) {
    console.error(err);
  }
};

export const setUserData = (key, value) => {
  localStorage.setItem(key, value);
  console.log(`${key}:${value} is in localStorage!`);
};

export const getUserData = key => {
  const value = localStorage.getItem(key);
  console.log(`${key}:${value} received from localStorage!`);
  return value;
};

export const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;

  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};
