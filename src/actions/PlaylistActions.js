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
export const createPlaylist = dispatch => values => {
  console.log('we in here');
  validateToken();
  spotify.setAccessToken(getUserData('spotifyAccessToken'));
  const { name, imageUrl, imageBinary, emotion, degree } = values;

  try {
    console.log('dispatching pgs!');
    dispatch({ type: PLAYLIST_GENERATION_STARTED });
    // const me = await spotify.getMe();
    // const res = await spotify.createPlaylist(me.id, {
    //   name: `Shmood Presents: ${name}`,
    // });

    // addPhotoToPlaylist(res.id, imageBinary);
    // fillPlaylist(res.id, values);
  } catch (err) {
    console.log('wtf', err);
    dispatch({ type: PLAYLIST_GENERATION_FAIL });
  }
};

export const addPhotoToPlaylist = async (playlistId, imageData) => async dispatch => {
  try {
    dispatch({ type: PLAYLIST_PHOTO_ADD_STARTED });
    const res = await spotify.uploadCustomPlaylistCoverImage(playlistId, imageData);
    console.log(res);
    dispatch({ type: PLAYLIST_PHOTO_ADD_SUCCESS });
  } catch (err) {
    console.log('uh-oh', err);
    dispatch({ type: PLAYLIST_PHOTO_ADD_FAIL });
  }
};

export const fillPlaylist = async (playlistId, values) => async dispatch => {
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
    dispatch({ type: PLAYLIST_GENERATION_SUCCESS });
  } catch (err) {
    console.log(err);
    dispatch({ type: PLAYLIST_GENERATION_FAIL });
  }
};
