/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import Spotify from 'spotify-web-api-js';
import { getUserData, refreshTokensIfExpired, seeds } from '../assets/scripts/spotify';

import {
  PLAYLIST_GENERATION_STARTED,
  PLAYLIST_GENERATION_SUCCESS,
  PLAYLIST_GENERATION_FAIL,
  PLAYLIST_PHOTO_ADD_STARTED,
  PLAYLIST_PHOTO_ADD_SUCCESS,
  PLAYLIST_PHOTO_ADD_FAIL,
} from './types';

const spotify = new Spotify();

const validateToken = () => {
  refreshTokensIfExpired();
  spotify.setAccessToken(getUserData('spotifyAccessToken'));
};

// Creates and adds image to playlist.
export const createPlaylist = async values => {
  validateToken();
  spotify.setAccessToken(getUserData('spotifyAccessToken'));
  const { name, imageUrl, imageBinary, emotion, degree } = values;

  try {
    const me = await spotify.getMe();
    const res = await spotify.createPlaylist(me.id, {
      name: `Shmood Presents: ${name}`,
    });

    addPhotoToPlaylist(res.id, imageBinary);
    fillPlaylist(res.id, values);
  } catch (err) {
    console.log(err);
  }
};

export const addPhotoToPlaylist = async (playlistId, imageData) => {
  try {
    const res = await spotify.uploadCustomPlaylistCoverImage(playlistId, imageData);
    console.log(res);
  } catch (err) {
    console.log('uh-oh', err);
  }
};

export const fillPlaylist = async (playlistId, values) => {
  validateToken();
  const { emotion, degree } = values;
  const deg = degree > 0.5 ? 'high' : 'low';
  const options = seeds[emotion].degree[deg];

  try {
    const res = await spotify.getRecommendations(options);
    console.log(res);
    const { tracks } = res;
    const songs = tracks.map(track => track.uri);
    await spotify.addTracksToPlaylist(playlistId, songs);
  } catch (err) {
    console.log(err);
  }
};
